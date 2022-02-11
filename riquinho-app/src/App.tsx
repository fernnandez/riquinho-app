import "./app.styles.scss";
import { Routes, Route } from "react-router-dom";
import { CadastroPage } from "./pages/Cadastro";
import { LoginPage } from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  );
}

export default App;
