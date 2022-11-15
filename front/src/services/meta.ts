import api from './api';
import { TransacaoResponse } from './transacao';

export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  progresso: number;
  prazo: number;
  valor: number;
}

export const findAllMeta = async (token: string) => {
  return api.get<Meta[]>('/meta', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMeta = async (data: any, token: string) => {
  console.log(data);

  return api.post(
    '/meta',
    { ...data },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
