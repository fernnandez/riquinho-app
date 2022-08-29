import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transacao } from '../../transacao/entities/transacao.entity';
import { User } from './user.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  icon: string;

  @Column()
  color: string;

  @Column({ name: 'is_for_receita' })
  isForReceita: boolean;

  @Column({ name: 'is_for_despesa' })
  isForDespesa: boolean;

  @ManyToOne(() => User, (user) => user.transacoes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transacao, (transacao) => transacao.categoria)
  transacoes: Transacao[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
