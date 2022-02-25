import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export function FormLogin() {
  return (
    <form className={styles.login} action="#">
      <div className={styles.inputs}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="seuemail@email.com"
          autoComplete="off"
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="**************"
        />
      </div>

      <div className={styles.submit}>
        <button type="submit">Entrar</button>
        <p>
          Ainda não tem uma conta? <Link to="/cadastro">cadastre-se</Link>
        </p>
      </div>
    </form>
  );
}
