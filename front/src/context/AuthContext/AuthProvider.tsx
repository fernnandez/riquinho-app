import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorage from '../../hooks/useStorage/useStorage';
import { authVerify } from '../../services/auth';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: any) => {
  const [token, setToken, remove] = useStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      authVerify(token.token).catch(() => {
        navigate('/login');
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, remove }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
