import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transacao } from './transacao.entity';

export enum StatusMeta {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADA = 'FINALIZADA',
}
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

  @Column({ type: 'timestamp', name: 'data_inicio' })
  dataInicio: Date;

  @Column({ type: 'enum', enum: StatusMeta })
  status: StatusMeta;

  @OneToOne(() => Transacao, (transacao) => transacao.parcelas)
  @JoinColumn({ name: 'transacao_id' })
  transacao: Transacao;
}
