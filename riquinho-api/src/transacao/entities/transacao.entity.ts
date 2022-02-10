import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
}

export enum Status {
  EFETIVADA = 'EFETIVADA',
  PENDENTE = 'PENDENTE',
}

export enum CategoriaTransacao {
  ALIMENTACAO = 'ALIMENTACAO',
  MORADIA = 'MORADIA',
  PAGAMENTO = 'PAGAMENTO',
  OUTROS = 'OUTROS',
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

  @Column({ type: 'enum', enum: CategoriaTransacao })
  categoria: CategoriaTransacao;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  valor: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
