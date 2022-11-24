import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmailUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;
}
