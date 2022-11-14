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
  parcelas: number;
}

export interface TransacaoResponse {
  id: string;
  titulo: string;
  categoria: CategoriaResponse;
  tipo: TipoTransacaoEnum;
  descricao: string;
  parcelas: {
    id: string;
    status: StatusEnum;
    data: Date;
    valor: number;
  };
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

export const findAllTransacao = async (
  token: string,
  tipo: TipoTransacaoEnum,
  data: Date
) => {
  return api.get<TransacaoResponse[]>('/transacao', {
    params: { tipo: tipo, data: data },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const findResumo = async (token: string, data: Date) => {
  return api.get<{
    receitas: number;
    receitasEfetivadas: number;
    despesas: number;
    despesasEfetivadas: number;
  }>('/transacao/resumo', {
    params: { data: data },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStatus = async (idTransacao: string, token: string) => {
  return api.get(`/transacao/change-status/${idTransacao}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
