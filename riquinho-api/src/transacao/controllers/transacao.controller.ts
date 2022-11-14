import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUpdateTransacaoDto } from '../dtos/create-update-transacao.dto';
import { TipoTransacao, Transacao } from '../entities/transacao.entity';
import { TransacaoService } from '../services/transacao.service';

@UseGuards(AuthGuard('jwt'))
@Controller('transacao')
export class TransacaoController {
  constructor(private transacaoService: TransacaoService) {}

  @Get()
  async findAll(
    @Request() req,
  ): Promise<{ receitas: Transacao[]; despesas: Transacao[] }> {
    const receitas = await this.transacaoService.findAllByTipo(
      req.user,
      TipoTransacao.RECEITA,
    );
    const despesas = await this.transacaoService.findAllByTipo(
      req.user,
      TipoTransacao.DESPESA,
    );

    return { receitas, despesas };
  }

  @Get('resumo')
  findResumo(@Request() req) {
    return this.transacaoService.findResumo(req.user);
  }

  @Get('resumo/categoria')
  findResumoCategoria(@Request() req) {
    return this.transacaoService.findResumoCategoria(req.user);
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

  @Get('/change-status/:id')
  async updateStatus(@Param('id') id: string): Promise<void> {
    return this.transacaoService.updateStatus(id);
  }
}
