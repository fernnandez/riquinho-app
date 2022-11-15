import api from './api';

export interface Meta {
  id: string;
  titulo: string;
  descricao: string;
  progresso: number;
  prazo: number;
  valor: number;
  dataInicio: Date;
}

export const findAllMeta = async (token: string) => {
  return api.get<Meta[]>('/meta', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMeta = async (data: any, token: string) => {
  return api.post(
    '/meta',
    { ...data },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateMeta = async (id: string, data: any, token: string) => {
  return api.put(
    `/meta/${id}`,
    { ...data },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteMeta = async (id: string, token: string) => {
  return api.delete(`/meta/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
