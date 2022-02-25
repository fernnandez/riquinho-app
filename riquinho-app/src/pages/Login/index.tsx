import styles from "./styles.module.scss";
import ilustration from "../../assets/login-ilustration.svg";
import logo from "../../assets/logo.svg";
import { FormLogin } from "../../components/FormLogin";

export function LoginPage() {
  return (
    <main>
      <div className={styles.ilustration}>
        <h2>Sua plataforma de gestão</h2>
        <h1>Financeira</h1>
        <img src={ilustration} alt="ilustração" />
      </div>
      <div className={styles.formLogin}>
        <img src={logo} alt="Logo riquinho" />
        <FormLogin />
      </div>
    </main>
  );
}
