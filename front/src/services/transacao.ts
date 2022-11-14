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
  parcelado: boolean;
}

export interface TransacaoResponse {
  id: string;
  titulo: string;
  categoria: CategoriaResponse;
  tipo: TipoTransacaoEnum;
  descricao: string;
  parcelado: boolean;
  valorTotal: number;
  parcelas: {
    descricao: string;
    id: string;
    status: StatusEnum;
    data: Date;
    valor: number;
  }[];
}

export interface TransacaoOneParcela {
  id: string;
  titulo: string;
  categoria: CategoriaResponse;
  tipo: TipoTransacaoEnum;
  descricao: string;
  parcelado: boolean;
  valorTotal: number;
  parcelas: number;
  parcela: {
    descricao: string;
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

export const findAllTransacao = async (token: string) => {
  return api.get<{
    receitas: TransacaoResponse[];
    despesas: TransacaoResponse[];
  }>('/transacao', {
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

export const findResumoCategoria = async (token: string, data: Date) => {
  return api.get<{
    despesaCategoryValue: {
      name: string;
      value: number;
      color: string;
    }[];
    receitaCategoryValue: {
      name: string;
      value: number;
      color: string;
    }[];
  }>('/transacao/resumo/categoria', {
    params: { data: data },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStatus = async (idTransacao: string, token: string) => {
  return api.get(`/transacao/change-status/${idTransacao}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
