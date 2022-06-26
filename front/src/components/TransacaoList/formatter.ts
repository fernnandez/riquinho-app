import { TransacaoResponse } from '../../services/transacao';
import { TipoTransacaoEnum } from './components/TransacaoModals/constants';

export function getTransacaoByTipo(
  tipo: TipoTransacaoEnum,
  transacoes: TransacaoResponse[]
) {
  return transacoes.filter((transacao) => transacao.tipo === tipo);
}

export function getValues(transacoes: TransacaoResponse[]) {
  let receitas = 0;
  let despesas = 0;

  transacoes.forEach((transacao) => {
    if (transacao.tipo === TipoTransacaoEnum.RECEITA) {
      receitas += Number(transacao.valor);
    } else {
      despesas += Number(transacao.valor);
    }
  });

  return { receitas, despesas };
}
