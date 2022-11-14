import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status, TipoTransacao } from '../entities/transacao.entity';

export class CreateUpdateTransacaoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsDateString()
  data: Date;

  @IsNotEmpty()
  @IsEnum(TipoTransacao)
  tipo: TipoTransacao;

  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsBoolean()
  parcelado: boolean;

  @IsNotEmpty()
  @IsNumber()
  parcelas: number;
}
