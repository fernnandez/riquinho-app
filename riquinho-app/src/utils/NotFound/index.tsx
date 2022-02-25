import styles from "./styles.module.scss";
import notFound from "../../assets/not-found.svg";

export function NotFoundFeedback() {
  return (
    <div className={styles.notFoundFeedback}>
      <img src={notFound} alt="ilustração de dados não encontrados" />
      <h2>Não há informações salvas</h2>
    </div>
  );
}
