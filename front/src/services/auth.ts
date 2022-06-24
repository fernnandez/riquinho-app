import api from './api';

// no login é preciso ser password por conta do passportLocal
interface authLoginType {
  email: string;
  password: string;
}

interface authCadastroType {
  nome: string;
  email: string;
  senha: string;
}

export const authLogin = async ({ email, password }: authLoginType) => {
  return api.post('/auth/login', { email, password });
};

export const authCadastro = async ({
  nome,
  email,
  senha,
}: authCadastroType) => {
  await api.post('user', { nome, email, senha });
};
