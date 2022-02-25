import styles from "./styles.module.scss";
import logo from "../../assets/logo.svg";
import ilustration from "../../assets/cadastro-ilustration.svg";
import { FormCadastro } from "../../components/FormCadastro";

export function CadastroPage() {
  return (
    <main>
      <div className={styles.ilustration}>
        <h2>Sua educação financeira</h2>
        <h1>É importante</h1>
        <img src={ilustration} alt="ilustração" />
      </div>
      <div className={styles.formCadastro}>
        <img src={logo} alt="Logo riquinho" />
        <FormCadastro />
      </div>
    </main>
  );
}
