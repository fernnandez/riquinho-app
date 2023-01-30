import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CategoriaService } from '../../user/services/categoria.service';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { Parcela, Status } from '../entities/parcela.entity';
import { TipoTransacao, Transacao } from '../entities/transacao.entity';
import { MetaService } from './meta.service';
import { ParcelaService } from './parcela.service';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    private readonly categoriaService: CategoriaService,
    private readonly parcelaService: ParcelaService,
    @Inject(forwardRef(() => MetaService))
    private readonly metaService: MetaService,
  ) {}

  async findAllByTipo(user: User, tipo: TipoTransacao) {
    const transacoes = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .andWhere('transacao.tipo = :tipo', { tipo })
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .leftJoin('transacao.meta', 'meta')
      .addSelect('meta.status')
      .getMany();

    const transacoesDoMes = [];

    for (const transacao of transacoes) {
      let valorTotal = 0;

      const meta = await this.metaService.findMetaByTransacao(transacao.id);

      transacao.parcelas.forEach((el) => {
        valorTotal += Number(el.valor);
      });

      transacoesDoMes.push({
        ...transacao,
        valorTotal,
        statusMeta: meta ? meta.status : null,
      });
    }

    return transacoesDoMes;
  }

  async findOne(id: string): Promise<Transacao> {
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

  async updateDescricao(id: string, descricao: string): Promise<void> {
    const transacao = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.id = :id', { id: id })
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .getOne();

    await this.transacaoRepository.save({
      ...transacao,
      descricao: `Valor Mensal da meta ${descricao}`,
    });
  }

  async updateStatus(idTransacao: string, idParcela: string): Promise<void> {
    await this.parcelaService.updateStatus(idParcela);

    const meta = await this.metaService.findMeta(idTransacao);

    const transacao = await this.findOne(idTransacao);

    if (transacao.tipo === TipoTransacao.META) {
      let valorEfetivado = 0;
      meta.transacao.parcelas.forEach((parcela) => {
        if (parcela.status === Status.EFETIVADA) {
          valorEfetivado += +parcela.valor;
        }
      });

      if (valorEfetivado === 0) {
        await this.metaService.updateProgresso(meta.id, 0);
      } else {
        const onePercent = meta.valor / 100;
        const progress = valorEfetivado / onePercent;
        await this.metaService.updateProgresso(meta.id, progress);
      }
    }
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

  async finishTransacao(idTransacao: string) {
    const today = DateTime.now();

    const transacao = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .orderBy('parcelas.data', 'ASC')
      .where('transacao.id = :id', { id: idTransacao })
      .getOne();

    const newParcelas = new Array<Parcela>();
    let lastParcela = {} as Parcela;

    const mesPrimeiraParcela = DateTime.fromJSDate(
      new Date(transacao.parcelas[0].data),
    ).month;
    const anoPrimeiraParcela = DateTime.fromJSDate(
      new Date(transacao.parcelas[0].data),
    ).year;

    if (
      anoPrimeiraParcela > today.year ||
      (anoPrimeiraParcela === today.year && mesPrimeiraParcela > today.month)
    ) {
      throw new ConflictException(
        'Não é possivel finalizar uma meta cuja primeira parcela é maior que a data atual',
      );
    }

    transacao.parcelas.forEach((parcela) => {
      const dataParcela = DateTime.fromJSDate(new Date(parcela.data));

      if (dataParcela.year < today.year && dataParcela.month < today.month) {
        newParcelas.push({ ...parcela, status: Status.EFETIVADA, transacao });
      } else if (
        dataParcela.year === today.year &&
        dataParcela.month < today.month
      ) {
        newParcelas.push({ ...parcela, status: Status.EFETIVADA, transacao });
      } else if (
        dataParcela.year === today.year &&
        dataParcela.month === today.month
      ) {
        lastParcela = {
          ...parcela,
          valor: Number(parcela.valor),
          status: Status.EFETIVADA,
          transacao,
        };
      } else {
        lastParcela.valor += Number(parcela.valor);
      }
    });

    // Parcela de finalização
    newParcelas.push(lastParcela);

    await this.parcelaService.removeParcelas(transacao.id);
    await this.parcelaService.saveParcelas(newParcelas);
  }

  async compareLastMonth(user: User, tipo: TipoTransacao) {
    const transacoes = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .andWhere('transacao.tipo = :tipo', { tipo })
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .getMany();

    let lastMonthValue = 0;

    let currentValue = 0;

    const today = DateTime.now().startOf('month');

    transacoes.forEach((transacao) => {
      transacao.parcelas.forEach((parcela) => {
        // VERIFICAR DATAS
        const dataParcela = DateTime.fromJSDate(new Date(parcela.data)).startOf(
          'month',
        );

        if (dataParcela.toISODate() === today.toISODate()) {
          currentValue += Number(parcela.valor);
        } else if (
          // Mes anterior
          dataParcela.plus({ month: 1 }).toISODate() === today.toISODate()
        ) {
          lastMonthValue += Number(parcela.valor);
        }
      });
    });

    if (currentValue === 0 && lastMonthValue === 0) {
      return {
        value: 0,
        diff: 0,
      };
    }

    const percent = ((currentValue - lastMonthValue) / lastMonthValue) * 100;

    return {
      value: currentValue,
      diff: percent,
    };
  }

  async findMainCategory(user: User, tipo: TipoTransacao) {
    const transacoes = await this.transacaoRepository
      .createQueryBuilder('transacao')
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .leftJoinAndSelect('transacao.parcelas', 'parcelas')
      .where('transacao.user = :id', { id: user.id })
      .andWhere('transacao.tipo = :tipo', { tipo })
      .orderBy('parcelas.data', 'ASC')
      .getMany();

    const today = DateTime.now().startOf('month');

    let lessDate = DateTime.now().startOf('month');

    const test: { value: number; categoriaName: string }[] = [];

    transacoes.forEach((transacao) => {
      const categoriaName = transacao.categoria.icon;

      const index = test.findIndex((el) => el.categoriaName === categoriaName);

      if (index === -1) {
        transacao.parcelas.forEach((parcela) => {
          const dataParcela = DateTime.fromJSDate(
            new Date(parcela.data),
          ).startOf('month');

          if (dataParcela <= lessDate) {
            lessDate = dataParcela;
          }

          if (dataParcela <= today) {
            test.push({ value: Number(parcela.valor), categoriaName });
          }
        });
      } else {
        transacao.parcelas.forEach((parcela) => {
          const dataParcela = DateTime.fromJSDate(
            new Date(parcela.data),
          ).startOf('month');

          if (dataParcela <= lessDate) {
            lessDate = dataParcela;
          }

          if (dataParcela <= today) {
            test[index].value += Number(parcela.valor);
          }
        });
      }
    });

    const mainCategory: { value: number | null; categoriaName: string | null } =
      { value: null, categoriaName: null };

    let totalValue = 0;

    test.forEach((el) => {
      totalValue += el.value;

      if (!mainCategory.value === null || mainCategory.value < el.value) {
        mainCategory.value = el.value;
        mainCategory.categoriaName = el.categoriaName;
      }
    });

    const periodo = today.diff(lessDate, ['month']);

    if (totalValue === mainCategory.value) {
      return {
        periodo: Math.ceil(periodo.months) + 1,
        percent: 100,
        categoriaName: mainCategory.categoriaName,
      };
    } else {
      const onePercent = totalValue / 100;

      const percent = mainCategory.value / onePercent;

      return {
        periodo: Math.ceil(periodo.months) + 1,
        percent,
        categoriaName: mainCategory.categoriaName,
      };
    }
  }
}
