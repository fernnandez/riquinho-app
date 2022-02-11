import styles from "./styles.module.scss";
import { Link } from 'react-router-dom'

export function FormCadastro() {
  return (
    <form className={styles.cadastro} action="">
      <label htmlFor="email">Nome</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="seu nome"
        autoComplete="off"
      />
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
      <label htmlFor="senha">Confirmar Senha</label>
      <input
        type="password"
        name="senha"
        id="senha"
        placeholder="**************"
      />
      <button type="submit">Cadastrar</button>
      <p>
        Já tem uma conta? <Link to='/login'>entre agora</Link>
      </p>
    </form>
  );
}
