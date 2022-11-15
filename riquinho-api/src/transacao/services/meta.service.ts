import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CategoriaService } from '../../user/services/categoria.service';
import { CreateUpdateMetaDto } from '../dtos/create-update-meta.dto';
import { Meta } from '../entities/meta.entity';
import { Status, TipoTransacao } from '../entities/transacao.entity';
import { TransacaoService } from './transacao.service';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
    private readonly transacaoService: TransacaoService,
    private readonly categoriaService: CategoriaService,
  ) {}

  async createMeta(user: User, createMetaDto: CreateUpdateMetaDto) {
    const categoria = await this.categoriaService.findByName('OUTROS');
    const transacao = await this.transacaoService.create(
      {
        categoria: categoria.id,
        data: createMetaDto.dataInicio,
        descricao: `Valor Mensal da meta ${createMetaDto.titulo}`,
        tipo: TipoTransacao.META,
        titulo: `Meta`,
        status: Status.PENDENTE,
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
    const meta = await this.metaRepository.findOne(id);

    await this.metaRepository.save({ ...meta, progresso });
  }

  async findMeta(idTransacao: string) {
    return this.metaRepository
      .createQueryBuilder('meta')
      .where('transacao.id = :id', { id: idTransacao })
      .innerJoinAndSelect('meta.transacao', 'transacao')
      .innerJoinAndSelect('transacao.parcelas', 'parcelas')
      .getOne();
  }

  async updateMeta(idMeta: string, updateMetaDto: CreateUpdateMetaDto) {
    const categoria = await this.categoriaService.findByName('OUTROS');

    const meta = await this.metaRepository.findOne(idMeta, {
      relations: ['transacao'],
    });

    await this.transacaoService.update(meta.transacao.id, {
      categoria: categoria.id,
      data: updateMetaDto.dataInicio,
      descricao: `Valor Mensal da meta ${updateMetaDto.titulo}`,
      tipo: TipoTransacao.META,
      titulo: `Meta`,
      status: Status.PENDENTE,
      parcelado: true,
      parcelas: updateMetaDto.prazo,
      valor: updateMetaDto.valor,
    });

    await this.metaRepository.save({
      id: meta.id,
      titulo: updateMetaDto.titulo,
      descricao: updateMetaDto.descricao,
      prazo: updateMetaDto.prazo,
      progresso: 0,
      valor: updateMetaDto.valor,
      dataInicio: updateMetaDto.dataInicio,
    });
  }

  async deleteMeta(idMeta: string) {
    const meta = await this.metaRepository.findOne(idMeta, {
      relations: ['transacao'],
    });

    await this.transacaoService.delete(meta.transacao.id);

    await this.metaRepository.delete(idMeta);
  }
}
