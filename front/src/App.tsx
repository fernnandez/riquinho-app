import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CadastroPage } from './pages/CadastroPage';
import { LoginPage } from './pages/LoginPage';

import { NotificationsProvider } from '@mantine/notifications';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { TransacaoPage } from './pages/TransacaoPage';

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <NotificationsProvider position="top-center" transitionDuration={1000} autoClose={4000}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TransacaoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </ModalProvider>
    </div>
  );
}

export default App;
