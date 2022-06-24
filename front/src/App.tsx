import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CadastroPage } from './pages/CadastroPage';
import { LoginPage } from './pages/LoginPage';

import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <div className="App">
      <NotificationsProvider position="top-center">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </div>
  );
}

export default App;
