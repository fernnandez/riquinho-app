import { DateTime } from 'luxon';
import { TransacaoResponse } from '../../services/transacao';
import {
  StatusEnum,
  TipoTransacaoEnum,
} from './components/TransacaoModals/constants';

export function getTransacaoByTipo(
  tipo: TipoTransacaoEnum,
  transacoes: TransacaoResponse[],
  data: DateTime
) {
  return transacoes.filter(
    (transacao) =>
      transacao.tipo === tipo &&
      DateTime.fromISO(transacao.data.toString()).month === data.month &&
      DateTime.fromISO(transacao.data.toString()).year === data.year
  );
}

export function getValues(transacoes: TransacaoResponse[], data: DateTime) {
  let receitas = 0;
  let despesas = 0;
  let receitasEfetivadas = 0;
  let despesasEfetivadas = 0;

  transacoes.forEach((transacao) => {
    if (
      DateTime.fromISO(transacao.data.toString()).month === data.month &&
      DateTime.fromISO(transacao.data.toString()).year === data.year
    ) {
      if (transacao.tipo === TipoTransacaoEnum.RECEITA) {
        if (transacao.status === StatusEnum.EFETIVADA) {
          receitasEfetivadas += Number(transacao.valor);
        }
        receitas += Number(transacao.valor);
      } else {
        if (transacao.status === StatusEnum.EFETIVADA) {
          despesasEfetivadas += Number(transacao.valor);
        }
        despesas += Number(transacao.valor);
      }
    }
  });

  return { receitas, despesas, receitasEfetivadas, despesasEfetivadas };
}
