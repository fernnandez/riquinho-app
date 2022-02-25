import { useQuery } from "react-query";
import axios from "axios";

import { NotFoundFeedback } from "../../utils/NotFound";
import { Loader } from "../../utils/Loading";
import { ErrorFeedback } from "../../utils/Error";

import styles from "./styles.module.scss";
import { MdOutlineFastfood } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import { Transacao } from "../../types/Transacao";

export function ListTransacoes() {
  const {
    data: transacoes,
    isFetching,
    isError,
  } = useQuery<Transacao[]>(
    "transacoes",
    async () => {
      const response = await axios.get("http://localhost:3002/transacao");
      return response.data;
    },
    { staleTime: 1000 * 60 }
  );

  return (
    <div className={styles.listBg}>
      {isFetching && <Loader />}
      <ul className={styles.list}>
        {transacoes?.map((transacao) => (
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
        ))}
        {transacoes?.length == 0 ? (
          <NotFoundFeedback />
        ) : isError ? (
          <ErrorFeedback />
        ) : null}
      </ul>
    </div>
  );
}
