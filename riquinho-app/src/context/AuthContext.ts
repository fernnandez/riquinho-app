import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  setToken: (token: string) => {},
});

export default AuthContext;
