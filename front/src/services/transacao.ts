import {
  StatusEnum,
  StatusMetaEnum,
  TipoTransacaoEnum,
} from '../utils/constants';
import api from './api';
import { CategoriaResponse } from './categoria';

interface TransacaoType {
  titulo: string;
  valor: number;
  data: Date;
  categoria: string;
  tipo: TipoTransacaoEnum | undefined;
  descricao: string | null;
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
  statusMeta: StatusMetaEnum | null;
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
  statusMeta: StatusMetaEnum | null;
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

export const updateStatus = async (
  idTransacao: string,
  idParcela: string,
  token: string
) => {
  return api.get(`/transacao/change-status/${idTransacao}/${idParcela}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const findCompareLastMonth = async (
  token: string,
  tipo: TipoTransacaoEnum
) => {
  return api.get<{ value: number; diff: number }>(
    `/transacao/compare/${tipo}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
