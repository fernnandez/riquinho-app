import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { CategoriaService } from './categoria.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly categoriaService: CategoriaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userFound) {
      throw new ConflictException('Esse email já está cadastrado');
    }

    const user = this.userRepository.create(createUserDto);
    const userCreated = await this.userRepository.save(user);

    await this.categoriaService.createCategoriasDefault(userCreated);

    return userCreated;
  }

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'nome', 'email'],
    });
  }

  async findOneOrFail(options: FindOneOptions<User>) {
    try {
      return await this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException('Usuario não encontrado');
    }
  }

  async delete(id: string) {
    await this.findOneOrFail({ where: { id } });
    this.userRepository.softDelete({ id });
  }
}
