import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import { MainDashboard } from '../../components/MainDashboard';
import AuthContext from '../../context/AuthContext/AuthContext';
import { MonthProvider } from '../../context/MonthContext/MonthContext';

export function Home() {
  return (
    <Navigation>
      <MonthProvider>
        <MainDashboard />
      </MonthProvider>
    </Navigation>
  );
}
