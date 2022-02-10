import styles from './styles.module.scss'

export function FormLogin() {
  return(
    <form className={styles.login} action="">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" placeholder="seuemail@email.com" autoComplete='off' />
      <label htmlFor="senha">Senha</label>
      <input type="password" name="senha" id="senha" placeholder="**************"/>
      <button type="submit">Entrar</button>
      <p>Ainda não tem uma conta? <a href="#">cadastre-se</a></p>
    </form>
  )
}
