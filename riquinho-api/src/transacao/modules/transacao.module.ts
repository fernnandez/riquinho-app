import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../../user/modules/categoria.module';
import { TransacaoController } from '../controllers/transacao.controller';
import { Parcela } from '../entities/parcela.entity';
import { Transacao } from '../entities/transacao.entity';
import { ParcelaService } from '../services/parcela.service';
import { TransacaoService } from '../services/transacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao, Parcela]), CategoriaModule],
  controllers: [TransacaoController],
  providers: [TransacaoService, ParcelaService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
