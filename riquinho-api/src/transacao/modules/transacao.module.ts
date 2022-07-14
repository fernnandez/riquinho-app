import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoController } from '../controllers/transacao.controller';
import { Transacao } from '../entities/transacao.entity';
import { TransacaoService } from '../services/transacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transacao])],
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
