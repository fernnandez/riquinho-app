import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Transacao } from '../entities/transacao.entity';

@Controller('transacao')
export class TransacaoController {
  constructor(private transacaoService: transacaoService) {}

  @Get()
  findAll(): Promise<Transacao[]> {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transacao> {
    return this.transacaoService.findOne(id);
  }

  @Post()
  create(
    @Body() createTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<Transacao> {
    return this.transacaoService.create(createTransacaoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    return this.transacaoService.update(id, updateTransacaoDto);
  }

  @Delete('id')
  delete(@Param('id') id: string): Promise<void> {
    return this.transacaoService.delete(id);
  }
}
