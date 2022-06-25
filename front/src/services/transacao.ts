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

interface TransacaoResponse {
  titulo: string;
  valor: number;
  data: Date;
  categoria: CategoriaEnum;
  tipo: TipoTransacaoEnum;
  descricao: string | null;
  status: StatusEnum;
}

export const createTransacao = async (data: TransacaoType, token: string) => {
  await api.post(
    '/transacao',
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const findAllTransacao = async (token: string) => {
  console.log(token);
  return api.get<TransacaoResponse[]>('/transacao', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
