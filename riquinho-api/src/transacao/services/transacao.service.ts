import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
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

  async findAllByTipo(user: User, tipo: TipoTransacao, date: Date) {
    const transacoes = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .andWhere('transacao.tipo = :tipo', { tipo })
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .getMany();

    const transacoesDoMes = [];

    const DateTimeToCompare = DateTime.fromJSDate(new Date(date));

    transacoes.forEach((transacao) => {
      transacao.parcelas.forEach((parcela) => {
        const DateTimeParcela = DateTime.fromJSDate(new Date(parcela.data));
        if (
          DateTimeParcela.month === DateTimeToCompare.month &&
          DateTimeParcela.year === DateTimeToCompare.year
        ) {
          transacoesDoMes.push({ ...transacao, parcelas: { ...parcela } });
        }
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

    console.log(categoria);
    // await this.transacaoRepository.update(id, {
    //   ...updateTransacaoDto,
    //   categoria,
    // });
  }

  async updateStatus(id: string, updateTransacaoDto: Transacao): Promise<void> {
    /**Verificação e atribuição do novo status */
    // if (updateTransacaoDto.status == Status.EFETIVADA) {
    //   updateTransacaoDto.status = Status.PENDENTE;
    // } else {
    //   updateTransacaoDto.status = Status.EFETIVADA;
    // }

    await this.transacaoRepository.update(id, updateTransacaoDto);
  }

  async delete(id: string): Promise<void> {
    await this.transacaoRepository.delete(id);
  }

  async findResumo(user: User, date: Date) {
    let receitas = 0;
    let despesas = 0;
    let receitasEfetivadas = 0;
    let despesasEfetivadas = 0;

    const dataReceitas = await this.findAllByTipo(
      user,
      TipoTransacao.RECEITA,
      date,
    );

    const dataDespesas = await this.findAllByTipo(
      user,
      TipoTransacao.DESPESA,
      date,
    );

    if (dataReceitas.length) {
      dataReceitas.forEach((transacao) => {
        if (transacao.parcelas.status === Status.EFETIVADA) {
          receitasEfetivadas += Number(transacao.parcelas.valor);
        }
        receitas += Number(transacao.parcelas.valor);
      });
    }

    if (dataReceitas.length) {
      dataDespesas.forEach((transacao) => {
        if (transacao.parcelas.status === Status.EFETIVADA) {
          despesasEfetivadas += Number(transacao.parcelas.valor);
        }
        despesas += Number(transacao.parcelas.valor);
      });
    }

    return { receitas, receitasEfetivadas, despesas, despesasEfetivadas };
  }
}
