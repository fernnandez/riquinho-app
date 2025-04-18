import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hashSync } from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateNameUserDto } from '../dtos/update-name-user.dto';

import { UpdateEmailUserDto } from '../dtos/update-email-user.dto';

import { UpdateSenhaUserDto } from '../dtos/update-password-user-dto';

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

  async updateName(updateNameUserDto: UpdateNameUserDto, id: string) {
    const userToEdit = await this.findOneOrFail({ where: { id } });

    if (!(await compare(updateNameUserDto.senha, userToEdit.senha))) {
      throw new BadRequestException(
        'Forneca a senha correta para atualizar as informações',
      );
    }

    userToEdit.nome = updateNameUserDto.nome;

    return this.userRepository.save(userToEdit);
  }

  async updateEmail(updateEmailUserDto: UpdateEmailUserDto, id: string) {
    const userToEdit = await this.findOneOrFail({ where: { id } });

    if (!(await compare(updateEmailUserDto.senha, userToEdit.senha))) {
      throw new BadRequestException(
        'Forneca a senha correta para atualizar as informações',
      );
    }

    userToEdit.email = updateEmailUserDto.email;

    return this.userRepository.save(userToEdit);
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

  async updateSenha(updateSenhaUserDto: UpdateSenhaUserDto, id: string) {
    const userToEdit = await this.findOneOrFail({ where: { id } });

    if (!(await compare(updateSenhaUserDto.lastSenha, userToEdit.senha))) {
      throw new BadRequestException('Senha incorreta');
    }
    return this.userRepository.save({
      ...userToEdit,
      senha: hashSync(updateSenhaUserDto.senha, 10),
    });
  }

  async delete(id: string) {
    await this.findOneOrFail({ where: { id } });
    this.userRepository.softDelete({ id });
  }
}
