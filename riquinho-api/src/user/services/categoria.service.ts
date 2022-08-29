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

  async update(id: string, updateCategoriaDto: CreateCategoriaDto) {
    return this.categoriaRepository.update(id, updateCategoriaDto);
  }

  async findAll(user: User) {
    return this.categoriaRepository.find({ where: { user } });
  }

  async delete(id: string) {
    // TODO ajustar possiveis receitas que tenham essa categoria com outra categoria
    return this.categoriaRepository.delete(id);
  }
}
