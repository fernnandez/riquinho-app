import styles from './styles.module.scss';

interface ModalCreateTransacaoProps {
  open: boolean;
  onClose: () => void;
  isReceita: boolean;
}

export function ModalCreateTransacao({
  open,
  onClose,
  isReceita,
}: ModalCreateTransacaoProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.modalContainer} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>Titulo</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </header>
        <h2>Modal de cadastro</h2>
      </div>
    </div>
  );
}
