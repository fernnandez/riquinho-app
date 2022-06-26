import { TransacaoResponse } from '../../services/transacao';
import { TipoTransacaoEnum } from './components/TransacaoModals/constants';

export function getTransacaoByTipo(
  tipo: TipoTransacaoEnum,
  transacoes: TransacaoResponse[]
) {
  return transacoes.filter((transacao) => transacao.tipo === tipo);
}
