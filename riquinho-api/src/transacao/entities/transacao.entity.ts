import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../user/entities/categoria.entity';
import { User } from '../../user/entities/user.entity';

export enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
}

export enum Status {
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

  @ManyToOne(() => Categoria, (categoria) => categoria.transacoes)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  valor: number;

  @ManyToOne(() => User, (user) => user.transacoes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
