import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CategoriaService } from '../../user/services/categoria.service';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { Status } from '../entities/parcela.entity';
import { TipoTransacao, Transacao } from '../entities/transacao.entity';
import { ParcelaService } from './parcela.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    private readonly categoriaService: CategoriaService,
    private readonly parcelaService: ParcelaService,
  ) {}

  async findAllByTipo(user: User, tipo: TipoTransacao) {
    const transacoes = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .andWhere('transacao.tipo = :tipo', { tipo })
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .getMany();

    const transacoesDoMes = [];

    transacoes.forEach((transacao) => {
      let valorTotal = 0;

      transacao.parcelas.forEach((el) => {
        valorTotal += Number(el.valor);
      });

      transacoesDoMes.push({
        ...transacao,
        valorTotal,
      });
    });

    return transacoesDoMes;
  }

  findOne(id: string): Promise<Transacao> {
    return this.transacaoRepository.findOne({ where: { id } });
  }

  async create(
    createTransacaoDto: CreateUpdateTransacaoDto,
    user: User,
  ): Promise<Transacao> {
    const categoria = await this.categoriaService.findOne(
      createTransacaoDto.categoria,
    );

    const transacao = await this.transacaoRepository.save({
      ...createTransacaoDto,
      parcelado: createTransacaoDto.parcelado,
      user,
      categoria,
      parcelas: [],
    });

    await this.parcelaService.createParcelas(
      createTransacaoDto.valor,
      createTransacaoDto.parcelas,
      createTransacaoDto.data,
      transacao,
    );

    return transacao;
  }

  async update(
    id: string,
    updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    const categoria = await this.categoriaService.findOne(
      updateTransacaoDto.categoria,
    );

    const transacao = await this.findOne(id);

    await this.parcelaService.removeParcelas(id);

    const parcelas = await this.parcelaService.createParcelas(
      updateTransacaoDto.valor,
      updateTransacaoDto.parcelas,
      updateTransacaoDto.data,
      transacao,
    );

    await this.transacaoRepository.save({
      ...updateTransacaoDto,
      id,
      categoria,
      parcelas,
    });
  }

  async updateStatus(id: string): Promise<void> {
    await this.parcelaService.updateStatus(id);
  }

  async delete(id: string): Promise<void> {
    await this.transacaoRepository.delete(id);
  }

  async findResumo(user: User) {
    let receitas = 0;
    let despesas = 0;
    let receitasEfetivadas = 0;
    let despesasEfetivadas = 0;

    const dataReceitas = await this.findAllByTipo(user, TipoTransacao.RECEITA);

    const dataDespesas = await this.findAllByTipo(user, TipoTransacao.DESPESA);

    if (dataReceitas.length) {
      dataReceitas.forEach((transacao) => {
        if (transacao.parcela.status === Status.EFETIVADA) {
          receitasEfetivadas += Number(transacao.parcela.valor);
        }
        receitas += Number(transacao.parcela.valor);
      });
    }

    if (dataReceitas.length) {
      dataDespesas.forEach((transacao) => {
        if (transacao.parcela.status === Status.EFETIVADA) {
          despesasEfetivadas += Number(transacao.parcela.valor);
        }
        despesas += Number(transacao.parcela.valor);
      });
    }

    return { receitas, receitasEfetivadas, despesas, despesasEfetivadas };
  }

  async findResumoCategoria(user: User) {
    const receitas = await this.findAllByTipo(user, TipoTransacao.RECEITA);

    const despesas = await this.findAllByTipo(user, TipoTransacao.DESPESA);

    const receitaCategoryValue = new Array<{
      name: string;
      value: number;
      color: string;
    }>();

    const despesaCategoryValue = new Array<{
      name: string;
      value: number;
      color: string;
    }>();

    receitas.forEach((transacao) => {
      const categoriaFound = receitaCategoryValue.find(
        (element) => element.name === transacao.categoria.nome,
      );

      if (categoriaFound) {
        categoriaFound.value += Number(transacao.parcela.valor);
      } else {
        receitaCategoryValue.push({
          name: transacao.categoria.nome,
          value: Number(transacao.parcela.valor),
          color: transacao.categoria.color,
        });
      }
    });

    despesas.forEach((transacao) => {
      const categoriaFound = despesaCategoryValue.find(
        (element) => element.name === transacao.categoria.nome,
      );

      if (categoriaFound) {
        categoriaFound.value += Number(transacao.parcela.valor);
      } else {
        despesaCategoryValue.push({
          name: transacao.categoria.nome,
          value: Number(transacao.parcela.valor),
          color: transacao.categoria.color,
        });
      }
    });
    return { receitaCategoryValue, despesaCategoryValue };
  }
}
