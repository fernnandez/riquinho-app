import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { Categoria } from '../entities/categoria.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto, user: User) {
    return this.categoriaRepository.save({ ...createCategoriaDto, user });
  }

  async findAll(user: User) {
    return this.categoriaRepository.find({ where: { user } });
  }
}
