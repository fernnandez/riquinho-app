import { createContext } from 'react';

const AuthContext = createContext({
  token: { token: '' },
  setToken: (token: string) => {},
  remove: () => {},
});

export default AuthContext;
