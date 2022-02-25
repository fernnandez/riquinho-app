import styles from "./styles.module.scss";
import loader from "../../assets/loader.svg";

export function Loader() {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="" />
      <h2>Carregando dados</h2>
    </div>
  );
}
