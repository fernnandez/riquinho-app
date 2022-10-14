import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { patch } from 'superagent';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { Transacao } from '../entities/transacao.entity';
import { TransacaoService } from '../services/transacao.service';

@UseGuards(AuthGuard('jwt'))
@Controller('transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}

  @Get()
  findAll(@Request() req): Promise<Transacao[]> {
    return this.transacaoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transacao> {
    return this.transacaoService.findOne(id);
  }

  @Post()
  create(
    @Body() createTransacaoDto: CreateUpdateTransacaoDto,
    @Request() req,
  ): Promise<Transacao> {
    return this.transacaoService.create(createTransacaoDto, req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransacaoDto: CreateUpdateTransacaoDto,
  ): Promise<void> {
    return this.transacaoService.update(id, updateTransacaoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.transacaoService.delete(id);
  }

  @Patch(':id')
  // @HttpCode(204)
  async updateStatus(@Param('id') id: string, @Request() req): Promise<void> {
    console.log(req.user);
    const responseById = await this.transacaoService.findOne(id);

    return this.transacaoService.updateStatus(id, responseById);
  }
}
