import { EntityRepository, Repository } from 'typeorm';
import { Transacao } from '../entities/transacao.entity';

@EntityRepository(Transacao)
export class TransacaoRepository extends Repository<Transacao> {}
