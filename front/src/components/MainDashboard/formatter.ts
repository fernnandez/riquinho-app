import { DateTime } from 'luxon';
import {
  TransacaoOneParcela,
  TransacaoResponse,
} from '../../services/transacao';
import {
  StatusEnum,
  TipoTransacaoEnum,
} from './components/TransacaoModals/constants';

export function getTransacaoDate(
  transacoes: TransacaoResponse[],
  data: DateTime
) {
  const transacoesDoMes = new Array<TransacaoOneParcela>();

  transacoes.forEach((transacao) => {
    let valorTotal = 0;

    transacao.parcelas.forEach((el) => {
      valorTotal += Number(el.valor);
    });

    transacao.parcelas.forEach((parcela) => {
      const DateTimeParcela = DateTime.fromJSDate(new Date(parcela.data));
      if (
        DateTimeParcela.month === data.month &&
        DateTimeParcela.year === data.year
      ) {
        transacoesDoMes.push({
          ...transacao,
          parcelas: transacao.parcelas.length,
          valorTotal,
          parcela,
        });
      }
    });
  });

  return transacoesDoMes;
}

export function getValues(transacoes: TransacaoResponse[], data: DateTime) {
  let receitas = 0;
  let despesas = 0;
  let receitasEfetivadas = 0;
  let despesasEfetivadas = 0;

  const transacoesAjustadas = getTransacaoDate(transacoes, data);

  transacoesAjustadas.forEach((transacao) => {
    if (transacao.tipo === TipoTransacaoEnum.RECEITA) {
      if (transacao.parcela.status === StatusEnum.EFETIVADA) {
        receitasEfetivadas += Number(transacao.parcela.valor);
      }
      receitas += Number(transacao.parcela.valor);
    } else {
      if (transacao.parcela.status === StatusEnum.EFETIVADA) {
        despesasEfetivadas += Number(transacao.parcela.valor);
      }
      despesas += Number(transacao.parcela.valor);
    }
  });

  return { receitas, despesas, receitasEfetivadas, despesasEfetivadas };
}

export function getValuesByCategory(
  receitas: TransacaoResponse[],
  despesas: TransacaoResponse[],
  data: DateTime
) {
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

  const receitasAjustadas = getTransacaoDate(receitas, data);
  const despesasAjustadas = getTransacaoDate(despesas, data);

  receitasAjustadas.forEach((transacao) => {
    const categoriaFound = receitaCategoryValue.find(
      (element) => element.name === transacao.categoria.nome
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

  despesasAjustadas.forEach((transacao) => {
    const categoriaFound = despesaCategoryValue.find(
      (element) => element.name === transacao.categoria.nome
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
