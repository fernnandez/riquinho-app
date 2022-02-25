import styles from "./styles.module.scss";
import error from "../../assets/error.svg";

export function ErrorFeedback() {
  return (
    <div className={styles.errorFeedback}>
      <img src={error} alt="" />
      <h2>Ops! Alguma coisa deu errado</h2>
    </div>
  );
}
