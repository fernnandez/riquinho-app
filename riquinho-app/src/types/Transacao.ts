export type Transacao = {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  tipo: string;
  categoria: string | null;
  status: string;
  valor: number;
};
