import { useQuery } from "react-query";
import axios from "axios";

import styles from "./styles.module.scss";
import { MdOutlineFastfood } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import notFoundILustration from "../../assets/not-found.svg";

type Transacao = {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  tipo: string;
  categoria: string | null;
  status: string;
  valor: number;
};

export function ListTransacoes() {
  const { data: transacoes, isFetching } = useQuery<Transacao[]>(
    "transacoes",
    async () => {
      const response = await axios.get("http://localhost:3002/transacao");
      return response.data;
    }
  );

  return (
    <div className={styles.listBg}>
      {isFetching || !transacoes ? (
        <p>Carregando</p>
      ) : (
        <ul className={styles.list}>
          {transacoes?.map((transacao) => {
            return (
              <li className={styles.listRow}>
                <div className={styles.info}>
                  <MdOutlineFastfood size={32} />
                  <p>{transacao.titulo}</p>
                  <p>R$ {transacao.valor}</p>
                  <p>{transacao.data}</p>
                </div>
                <div className={styles.actions}>
                  <AiOutlineEdit size={32} />
                  <MdDeleteOutline size={32} />
                </div>
              </li>
            );
          })}
          {transacoes.length == 0 ? (
            <>
              <img
                className={styles.notFound}
                src={notFoundILustration}
                alt="not found ilustration"
              />
              <h2>Nenhuma transação encontada</h2>
            </>
          ) : null}
        </ul>
      )}
    </div>
  );
}
