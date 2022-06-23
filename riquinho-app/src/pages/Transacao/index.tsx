import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { ListTransacoes } from '../../components/ListTransacoes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { ModalCreateTransacao } from '../../components/ModalCreateTransacao';

export function TransacaoPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isReceita, setIsReceita] = useState(true);

  function handleCloseCreateModal() {
    setIsOpenCreate(false);
  }

  function handleOpenCreateModal(boolean: boolean) {
    setIsReceita(boolean);
    setIsOpenCreate(true);
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.transacao}>
      <Header />
      <main>
        <div className={styles.cardTotal}>
          <p>Valor Total</p>
          <h2>R$: 7500,00</h2>
        </div>

        <div className={styles.filterButtons}>
          <button
            className={styles.greenButton}
            onClick={() => {
              handleOpenCreateModal(true);
            }}
          >
            + Nova receita
          </button>
          <button
            className={styles.redButton}
            onClick={() => {
              handleOpenCreateModal(false);
            }}
          >
            + Nova despesa
          </button>
        </div>

        <ListTransacoes />
      </main>
      <ModalCreateTransacao
        open={isOpenCreate}
        onClose={handleCloseCreateModal}
        isReceita={isReceita}
      />
    </div>
  );
}
