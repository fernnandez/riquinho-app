import {
  CategoriaEnum,
  StatusEnum,
  TipoTransacaoEnum,
} from '../components/MainDashboard/components/TransacaoModals/constants';
import api from './api';
import { CategoriaResponse } from './categoria';

interface TransacaoType {
  titulo: string;
  valor: number;
  data: Date;
  categoria: string;
  tipo: TipoTransacaoEnum | undefined;
  descricao: string | null;
  status: StatusEnum | undefined;
}

export interface TransacaoResponse {
  id: string;
  titulo: string;
  valor: number;
  data: Date;
  categoria: CategoriaResponse;
  tipo: TipoTransacaoEnum;
  descricao: string;
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

export const updateTransacao = async (
  idTransacao: string,
  data: TransacaoType,
  token: string
) => {
  await api.put(
    `/transacao/${idTransacao}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteTransacao = async (idTransacao: string, token: string) => {
  await api.delete(`/transacao/${idTransacao}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const findAllTransacao = async (token: string) => {
  return api.get<TransacaoResponse[]>('/transacao', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
