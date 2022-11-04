import api from './api';

export const findOneUser = async (token: string) => {
  return await api.get(`/user/find`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateNome = async (
  id: string,
  data: { nome: string; senha: string },
  token: string
) => {
  return await api.put(
    `/user/${id}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
