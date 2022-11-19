import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CadastroPage } from './pages/CadastroPage';
import { LoginPage } from './pages/LoginPage';

import { NotificationsProvider } from '@mantine/notifications';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { CustomPage } from './pages/CustomPage';
import { Home } from './pages/Home';
import AuthProvider from './context/AuthContext/AuthProvider';

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <NotificationsProvider
          position="top-center"
          transitionDuration={1000}
          autoClose={4000}
        >
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/custom" element={<CustomPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </NotificationsProvider>
      </ModalProvider>
    </div>
  );
}

export default App;
