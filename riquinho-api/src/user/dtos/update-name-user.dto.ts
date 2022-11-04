import { IsNotEmpty } from 'class-validator';

export class UpdateNameUserDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  senha: string;
}
