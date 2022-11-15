import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transacao } from './transacao.entity';

@Entity('meta')
export class Meta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column()
  valor: number;

  @Column()
  prazo: number;

  @Column()
  progresso: number;

  @OneToOne(() => Transacao, (transacao) => transacao.parcelas)
  @JoinColumn({ name: 'transacao_id' })
  transacao: Transacao;
}
