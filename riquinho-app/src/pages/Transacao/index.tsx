import styles from './styles.module.scss';
import { Header } from '../../components/Header';
import { ListTransacoes } from '../../components/ListTransacoes';
import { useState } from 'react';

export function TransacaoPage() {
  const [allFilter, setAllFilter] = useState(true);
  const [receitaFilter, setResceitaFilter] = useState(false);
  const [despesaFilter, setDespesaFilter] = useState(false);

  function handleAll() {
    setAllFalse()
    setAllFilter(true);
  }

  function handleReceita() {
    if (receitaFilter) {
      setResceitaFilter(false);
      setAllFilter(true);
    } else {
      setAllFalse();
      setResceitaFilter(true);
      setAllFilter(false);
    }
  }

  function handleDespesa() {
    if (despesaFilter) {
      setDespesaFilter(false);
      setAllFilter(true);
    } else {
      setAllFalse();
      setDespesaFilter(true);
      setAllFilter(false);
    }
  }

  function setAllFalse() {
    setAllFilter(false);
    setDespesaFilter(false);
    setResceitaFilter(false);
  }

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
            className={`${styles.blueButton} ${
              !allFilter ? styles.disable : null
            }`}
            onClick={handleAll}
          >
            Tudo
          </button>
          <button
            className={`${styles.greenButton} ${
              !receitaFilter ? styles.disable : null
            }`}
            onClick={handleReceita}
          >
            Receitas
          </button>
          <button
            className={`${styles.redButton} ${
              !despesaFilter ? styles.disable : null
            }`}
            onClick={handleDespesa}
          >
            Despesas
          </button>
        </div>

        <ListTransacoes />
      </main>
    </div>
  );
}
