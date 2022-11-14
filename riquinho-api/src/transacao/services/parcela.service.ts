import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela, Status } from '../entities/parcela.entity';
import { DateTime } from 'luxon';
import { Transacao } from '../entities/transacao.entity';

@Injectable()
export class ParcelaService {
  constructor(
    @InjectRepository(Parcela)
    private readonly parcelaRepository: Repository<Parcela>,
  ) {}

  async createParcelas(
    valor: number,
    qtdParcelas: number,
    dataBase: Date,
    transacao: Transacao,
  ) {
    const valorParcela = +(valor / qtdParcelas).toFixed(3);

    const parcelas = new Array<Parcela>();

    const dataBaseLuxon = DateTime.fromJSDate(new Date(dataBase));

    for (let index = 0; index < qtdParcelas; index++) {
      const dataParcela = dataBaseLuxon.plus({ month: index }).toJSDate();
      const parcela = this.parcelaRepository.create({
        valor: valorParcela,
        status: Status.PENDENTE,
        data: dataParcela,
        descricao: `${index + 1}º parcela`,
        transacao,
      });
      parcelas.push(parcela);
    }

    return this.parcelaRepository.save(parcelas);
  }

  async removeParcelas(idTransacao: string) {
    await this.parcelaRepository
      .createQueryBuilder('parcela')
      .delete()
      .from(Parcela)
      .where('transacao_id = :id', { id: idTransacao })
      .execute();
  }
}
