import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CategoriaService } from '../../user/services/categoria.service';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { Transacao } from '../entities/transacao.entity';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Transacao)
    private readonly transacaoRepository: Repository<Transacao>,
    private readonly categoriaService: CategoriaService,
  ) {}

  findAll(user: User): Promise<Transacao[]> {
    return this.transacaoRepository
      .createQueryBuilder('transacao')
      .where('transacao.user = :id', { id: user.id })
      .innerJoinAndSelect('transacao.categoria', 'categoria')
      .getMany();
  }

  findOne(id: string): Promise<Transacao> {
    return this.transacaoRepository.findOne({ where: { id } });
  }

  async create(
    createTransacaoDto: CreateUpdateTransacaoDto,
    user: User,
  ): Promise<Transacao> {
    // TODO tratamento de erros
    const categoria = await this.categoriaService.findOne(
      createTransacaoDto.categoria,
    );

    return this.transacaoRepository.save({
      ...createTransacaoDto,
      user,
      categoria,
    });
  }

  async update(
    id: string,
    updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    const categoria = await this.categoriaService.findOne(
      updateTransacaoDto.categoria,
    );

    await this.transacaoRepository.update(id, {
      ...updateTransacaoDto,
      categoria,
    });
  }

  async updateStatus(
    id: string,
    updateTransacaoDto: Transacao,
  ): Promise<void> {
    
    let statusTransacao;//status atual da transação

    /**Verificação e atribuição do novo status */
    if (updateTransacaoDto.status == 'EFETIVADA') {
      statusTransacao = 'PENDENTE';
    } else if (updateTransacaoDto.status == 'PENDENTE') {
      statusTransacao = 'EFETIVADA';
    } else {

      let messageErroUpdatestatus = {
        message: "status não definido"
      }

      console.log(messageErroUpdatestatus);
    }

    updateTransacaoDto.status = statusTransacao;//modifico o campo para a atualização de acordo com as condições
    
    await this.transacaoRepository.update(id, updateTransacaoDto);
  }

/*   async updateStatus(
    id: string,
    updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    
    await this.transacaoRepository.update(id, updateTransacaoDto);
  } */

  async delete(id: string): Promise<void> {
    await this.transacaoRepository.delete(id);
  }
}
