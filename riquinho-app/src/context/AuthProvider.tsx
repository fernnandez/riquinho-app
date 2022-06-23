import useStorage from '../hooks/useStorage';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useStorage('token');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
