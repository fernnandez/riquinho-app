import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../../user/modules/categoria.module';
import { MetaController } from '../controllers/meta.controller';
import { TransacaoController } from '../controllers/transacao.controller';
import { Meta } from '../entities/meta.entity';
import { Parcela } from '../entities/parcela.entity';
import { Transacao } from '../entities/transacao.entity';
import { MetaService } from '../services/meta.service';
import { ParcelaService } from '../services/parcela.service';
import { TransacaoService } from '../services/transacao.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transacao, Parcela, Meta]),
    CategoriaModule,
  ],
  controllers: [TransacaoController, MetaController],
  providers: [TransacaoService, ParcelaService, MetaService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
