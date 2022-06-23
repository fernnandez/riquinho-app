import useStorage from '../hooks/useStorage';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: any) => {
  const [token, setToken, remove] = useStorage('token');

  return (
    <AuthContext.Provider value={{ token, setToken, remove }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
