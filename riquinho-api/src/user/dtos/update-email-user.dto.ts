import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmailUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;
}
