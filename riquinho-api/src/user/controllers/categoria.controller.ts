import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { CategoriaService } from '../services/categoria.service';

@UseGuards(AuthGuard('jwt'))
@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto, @Request() req) {
    return this.categoriaService.create(createCategoriaDto, req.user);
  }

  @Get()
  async findAll(@Request() req) {
    return this.categoriaService.findAll(req.user);
  }
}
