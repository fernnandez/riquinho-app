import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../user/entities/categoria.entity';
import { User } from '../../user/entities/user.entity';
import { Meta } from './meta.entity';
import { Parcela } from './parcela.entity';

export enum TipoTransacao {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  META = 'META',
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

  @Column({ nullable: true })
  descricao: string;

  @Column()
  parcelado: boolean;

  @Column({ type: 'enum', enum: TipoTransacao })
  tipo: TipoTransacao;

  @ManyToOne(() => Categoria, (categoria) => categoria.transacoes)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @OneToMany(() => Parcela, (parcela) => parcela.transacao)
  parcelas: Parcela[];

  @OneToOne(() => Meta, (meta) => meta.transacao, { nullable: true })
  @JoinColumn({ name: 'meta_id' })
  meta: Meta;

  @ManyToOne(() => User, (user) => user.transacoes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
