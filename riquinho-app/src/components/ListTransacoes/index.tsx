import styles from './styles.module.scss';
import { MdOutlineFastfood } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';

export function ListTransacoes() {
  return (
    <div className={styles.listBg}>
      <ul className={styles.list}>
        <li className={styles.listRow}>
          <div className={styles.info}>
            <MdOutlineFastfood size={32} />
            <p>Compras do mês</p>
            <p>R$ 950,00</p>
            <p>06/02/2022</p>
          </div>
          <div className={styles.actions}>
            <AiOutlineEdit size={32} />
            <MdDeleteOutline size={32} />
          </div>
        </li>
        <li className={styles.listRow}>
          <div className={styles.info}>
            <MdOutlineFastfood size={32} />
            <p>Compras do mês</p>
            <p>R$ 950,00</p>
            <p>06/02/2022</p>
          </div>
          <div className={styles.actions}>
            <AiOutlineEdit size={32} />
            <MdDeleteOutline size={32} />
          </div>
        </li>
      </ul>
    </div>
  );
}
