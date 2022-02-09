import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoController } from '../controllers/transacao.controller';
import { TransacaoRepository } from '../repositories/transacao.respository';
import { TransacaoService } from '../services/transacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransacaoRepository])],
  controllers: [TransacaoController],
  providers: [TransacaoService],
  exports: [TransacaoService],
})
export class TransacaoModule {}
