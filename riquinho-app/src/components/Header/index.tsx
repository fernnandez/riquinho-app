import { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import AuthContext from '../../context/AuthContext';
import styles from './styles.module.scss';

export function Header() {
  const navigate = useNavigate();
  const { remove } = useContext(AuthContext);

  function logout() {
    navigate('/login');
    remove();
  }
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo riquinho" />
      <MdLogout className={styles.logoutIcon} onClick={() => logout()} />
    </header>
  );
}
