import api from './api';

interface authLoginType {
  email: string;
  password: string;
}

interface authCadastroType {
  nome: string;
  email: string;
  password: string;
}

export const authLogin = async ({ email, password }: authLoginType) => {
  return api.post('/auth/login', { email, password });
};

export const authCadastro = async ({
  nome,
  email,
  password,
}: authCadastroType) => {
  await api.post('user', { nome, email, password });
};
