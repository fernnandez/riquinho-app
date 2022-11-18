import { IsNotEmpty } from 'class-validator';

export class UpdateSenhaUserDto {
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  lastSenha: string;
}
