import { createContext } from 'react';

const AuthContext = createContext({
  token: '',
  setToken: (token: string) => {},
  remove: () => {},
});

export default AuthContext;
