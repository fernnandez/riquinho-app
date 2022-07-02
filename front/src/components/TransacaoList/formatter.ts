import { TransacaoResponse } from '../../services/transacao';
import { StatusEnum, TipoTransacaoEnum } from './components/TransacaoModals/constants';

export function getTransacaoByTipo(
  tipo: TipoTransacaoEnum,
  transacoes: TransacaoResponse[]
) {
  return transacoes.filter((transacao) => transacao.tipo === tipo);
}

export function getValues(transacoes: TransacaoResponse[]) {
  let receitas = 0;
  let despesas = 0;
  let receitasEfetivadas= 0;
  let despesasEfetivadas= 0;

  transacoes.forEach((transacao) => {
    if (transacao.tipo === TipoTransacaoEnum.RECEITA) {
      if(transacao.status === StatusEnum.EFETIVADA ){ receitasEfetivadas += Number(transacao.valor)}
      receitas += Number(transacao.valor);
    } else {
    if(transacao.status === StatusEnum.EFETIVADA){despesasEfetivadas += Number(transacao.valor)}
      despesas += Number(transacao.valor);
    }
  });
  console.log(despesas, despesasEfetivadas)

  return { receitas, despesas, receitasEfetivadas,despesasEfetivadas };
}
