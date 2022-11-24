import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMetaDto } from '../dtos/create-meta.dto';
import { UpdateMetaDto } from '../dtos/update-meta.dto';
import { MetaService } from '../services/meta.service';

@UseGuards(AuthGuard('jwt'))
@Controller('meta')
export class MetaController {
  constructor(private metaService: MetaService) {}

  @Post()
  async create(@Req() req, @Body() createMetaDto: CreateMetaDto) {
    return this.metaService.createMeta(req.user, createMetaDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMetaDto: UpdateMetaDto) {
    return this.metaService.updateMeta(id, updateMetaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.metaService.deleteMeta(id);
  }

  @Get()
  async findAll(@Req() req) {
    return this.metaService.findAll(req.user);
  }
}
