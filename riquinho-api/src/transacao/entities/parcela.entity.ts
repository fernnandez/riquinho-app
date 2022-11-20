import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transacao } from './transacao.entity';

export enum Status {
  EFETIVADA = 'EFETIVADA',
  PENDENTE = 'PENDENTE',
}

@Entity('parcela')
export class Parcela {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  valor: number;

  @Column({ type: 'timestamp' })
  data: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  descricao: string;

  @ManyToOne(() => Transacao, (transacao) => transacao.parcelas)
  @JoinColumn({ name: 'transacao_id' })
  transacao: Transacao;
}
