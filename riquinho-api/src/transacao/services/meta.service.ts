import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CategoriaService } from '../../user/services/categoria.service';
import { CreateMetaDto } from '../dtos/create-meta.dto';
import { UpdateMetaDto } from '../dtos/update-meta.dto';
import { Meta } from '../entities/meta.entity';
import { Status } from '../entities/parcela.entity';
import { TipoTransacao } from '../entities/transacao.entity';
import { TransacaoService } from './transacao.service';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
    private readonly transacaoService: TransacaoService,
    private readonly categoriaService: CategoriaService,
  ) {}

  async createMeta(user: User, createMetaDto: CreateMetaDto) {
    const categoria = await this.categoriaService.findByName('META');

    const transacao = await this.transacaoService.create(
      {
        categoria: categoria.id,
        data: createMetaDto.dataInicio,
        descricao: `Valor Mensal da meta ${createMetaDto.titulo}`,
        tipo: TipoTransacao.META,
        titulo: `Meta`,
        parcelado: true,
        parcelas: createMetaDto.prazo,
        valor: createMetaDto.valor,
      },
      user,
    );

    await this.metaRepository.save({
      titulo: createMetaDto.titulo,
      descricao: createMetaDto.descricao,
      prazo: createMetaDto.prazo,
      progresso: 0,
      valor: createMetaDto.valor,
      dataInicio: createMetaDto.dataInicio,
      transacao,
    });
  }

  async findAll(user: User) {
    return this.metaRepository
      .createQueryBuilder('meta')
      .where('transacao.user = :id', { id: user.id })
      .innerJoin('meta.transacao', 'transacao')
      .getMany();
  }

  async updateProgresso(id: string, progresso: number) {
    const meta = await this.metaRepository.findOne(id, {
      relations: ['transacao'],
    });

    if (progresso === 100) {
      await this.metaRepository.save({
        ...meta,
        progresso,
      });
    } else {
      await this.metaRepository.save({
        ...meta,
        progresso,
      });
    }
  }

  async findMeta(idTransacao: string) {
    return this.metaRepository
      .createQueryBuilder('meta')
      .where('transacao.id = :id', { id: idTransacao })
      .innerJoinAndSelect('meta.transacao', 'transacao')
      .innerJoinAndSelect('transacao.parcelas', 'parcelas')
      .getOne();
  }

  async updateMeta(idMeta: string, updateMetaDto: UpdateMetaDto) {
    const meta = await this.metaRepository.findOne(idMeta, {
      relations: ['transacao'],
    });

    await this.transacaoService.updateDescricao(
      meta.transacao.id,
      updateMetaDto.titulo,
    );

    await this.metaRepository.save({
      id: meta.id,
      titulo: updateMetaDto.titulo,
      descricao: updateMetaDto.descricao,
      prazo: meta.prazo,
      progresso: meta.progresso,
      valor: meta.valor,
      dataInicio: meta.dataInicio,
    });
  }

  async finishMeta(idMeta: string) {
    const meta = await this.metaRepository.findOne(idMeta, {
      relations: ['transacao'],
    });

    await this.transacaoService.finishTransacao(meta.transacao.id);

    await this.updateProgresso(meta.id, 100);
  }

  async deleteMeta(idMeta: string) {
    const meta = await this.metaRepository.findOne(idMeta, {
      relations: ['transacao', 'transacao.parcelas'],
    });

    const isEfetivada = meta.transacao.parcelas.find(
      (parcela) => parcela.status === Status.EFETIVADA,
    );

    if (isEfetivada) {
      throw new BadRequestException(
        'Não é possivel excluir uma meta que já foi iniciada',
      );
    }

    await this.transacaoService.delete(meta.transacao.id);

    await this.metaRepository.delete(idMeta);
  }
}
