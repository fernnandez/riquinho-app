import { Navigation } from '../../components/Navigation';
import { MonthProvider } from '../../context/MonthContext/MonthContext';
import { MainDashboard } from './components/MainDashboard';

export function Home() {
  return (
    <Navigation>
      <MonthProvider>
        <MainDashboard />
      </MonthProvider>
    </Navigation>
  );
}
