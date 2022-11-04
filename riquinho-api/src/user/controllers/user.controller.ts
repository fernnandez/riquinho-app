import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateNameUserDto } from '../dtos/update-name-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  async show(@Request() req) {
    const id = req.user.id;
    return this.userService.findOneOrFail({ where: { id } });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Put(':id')
  async updateName(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateNameUserDto: UpdateNameUserDto,
  ) {
    return this.userService.updateName(updateNameUserDto, id);
  }
}
