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

export const updateEmail = async (
  id: string,
  data: { email: string; senha: string },
  token: string
) => {
  return await api.put(
    `/user/update-email/${id}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateSenha = async (
  id: string,
  data: { lastSenha: string; senha: string },
  token: string
) => {
  return await api.put(
    `/user/changePassword/${id}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
