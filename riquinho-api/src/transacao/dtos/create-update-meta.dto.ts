import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUpdateMetaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  prazo: number;

  @IsNotEmpty()
  @IsDateString()
  dataInicio: Date;

  @IsNotEmpty()
  @IsNumber()
  valor: number;
}
