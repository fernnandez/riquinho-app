import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CadastroPage } from './pages/CadastroPage';
import { LoginPage } from './pages/LoginPage';

import { NotificationsProvider } from '@mantine/notifications';
import { Navigation } from './components/Navigation';
import { ModalProvider } from './context/ModalContext/ModalContext';
import { Home } from './pages/Home';
import { CustomPage } from './pages/CustomPage';

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/custom" element={<CustomPage />} />
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
