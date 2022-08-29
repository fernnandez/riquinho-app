import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CategoriaModule } from './categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CategoriaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
