import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMetaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao: string;
}
