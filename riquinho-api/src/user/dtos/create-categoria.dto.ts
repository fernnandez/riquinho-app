import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsBoolean()
  isForReceita: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isForDespesa: boolean;
}
