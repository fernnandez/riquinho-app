import styles from './styles.module.scss';
import { MdLogout } from 'react-icons/md';
import logo from '../../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo riquinho" />
      <MdLogout className={styles.logoutIcon} />
    </header>
  );
}
