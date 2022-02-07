import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
}

enum Status {
  EFETIVADA = 'EFETIVADA',
  PENDENTE = 'PENDENTE',
}

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({ type: 'timestamp' })
  data: Date;

  @Column({ type: 'enum', enum: TipoTransacao })
  tipo: TipoTransacao;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'timestamp' })
  valor: number;
}
