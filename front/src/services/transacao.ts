import {
  CategoriaEnum,
  StatusEnum,
  TipoTransacaoEnum,
} from '../components/TransacaoList/components/TransacaoModals/constants';
import api from './api';

interface TransacaoType {
  titulo: string;
  valor: number;
  data: Date;
  categoria: CategoriaEnum | undefined;
  tipo: TipoTransacaoEnum | undefined;
  descricao: string | null;
  status: StatusEnum | undefined;
}

export const createTransacao = async (data: TransacaoType) => {
  await api.post('/transacao', { ...data });
};
