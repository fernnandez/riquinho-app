import api from './api';

interface CategoriaType {
  nome: string;
  icon: string;
  color: string;
  isForReceita: boolean;
  isForDespesa: boolean;
}

export interface CategoriaResponse {
  id: string;
  nome: string;
  icon: string;
  color: string;
  isForReceita: boolean;
  isForDespesa: boolean;
  isDefault: boolean;
}

export const createCategoria = async (data: CategoriaType, token: string) => {
  await api.post(
    '/categoria',
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateCategoria = async (
  idCategoria: string,
  data: CategoriaType,
  token: string
) => {
  await api.put(
    `/categoria/${idCategoria}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const findAllCategorias = async (token: string) => {
  return api.get<CategoriaResponse[]>('/categoria', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCategoria = async (idCategoria: string, token: string) => {
  await api.delete(`/categoria/${idCategoria}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
