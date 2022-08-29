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
}

export const createCategoria = async (data: CategoriaType, token: string) => {
  console.log(token);
  await api.post(
    '/categoria',
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
