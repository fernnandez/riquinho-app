import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { TransacaoList } from '../../components/TransacaoList';
import AuthContext from '../../context/AuthContext/AuthContext';
import { MonthProvider } from '../../context/MonthContext/MonthContext';

export function TransacaoPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <Navigation>
      <MonthProvider>
        <TransacaoList />
      </MonthProvider>
    </Navigation>
  );
}
