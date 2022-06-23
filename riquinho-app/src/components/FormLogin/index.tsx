import styles from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useState } from 'react';
import { api } from '../../services/api';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';

export function FormLogin() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [email, setEmail] = useState<any>();
  const [senha, setSenha] = useState<any>();

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSenha = (event: any) => {
    setSenha(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    api
      .post('/auth/login', { email, password: senha })
      .then((result) => {
        setToken(result.data);
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setEmail('');
        setSenha('');
      });
  };

  return (
    <div>
      <form className={styles.login} onSubmit={(event) => handleSubmit(event)}>
        <div className={styles.inputs}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="seuemail@email.com"
            required
            value={email}
            onChange={(event) => handleEmail(event)}
          />
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="********"
            required
            value={senha}
            onChange={(event) => handleSenha(event)}
          />
        </div>

        <div className={styles.submit}>
          <button type="submit">Entrar</button>
          <p>
            Ainda não tem uma conta? <Link to="/cadastro">cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
