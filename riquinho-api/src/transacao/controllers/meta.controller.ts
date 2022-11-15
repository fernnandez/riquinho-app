import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUpdateMetaDto } from '../dtos/create-update-meta.dto';
import { MetaService } from '../services/meta.service';

@UseGuards(AuthGuard('jwt'))
@Controller('meta')
export class MetaController {
  constructor(private metaService: MetaService) {}

  @Post()
  async create(@Req() req, @Body() createMetaDto: CreateUpdateMetaDto) {
    return this.metaService.createMeta(req.user, createMetaDto);
  }

  @Get()
  async findAll(@Req() req) {
    return this.metaService.findAll(req.user);
  }
}
