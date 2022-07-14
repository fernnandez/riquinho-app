import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { Transacao } from '../entities/transacao.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
  ) {}

  findAll(user: User): Promise<Transacao[]> {
    return this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .getMany();
  }

  findOne(id: string): Promise<Transacao> {
    return this.transacaoRepository.findOne({ where: { id } });
  }

  create(
    createTransacaoDto: CreateUpdateTransacaoDto,
    user: User,
  ): Promise<Transacao> {
    return this.transacaoRepository.save({ ...createTransacaoDto, user });
  }

  async update(
    id: string,
    updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    await this.transacaoRepository.update(id, updateTransacaoDto);
  }

  async delete(id: string): Promise<void> {
    await this.transacaoRepository.delete(id);
  }
}
