import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  CategoriaTransacao,
  Status,
  TipoTransacao,
} from '../entities/transacao.entity';

export class CreateUpdateTransacaoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsDateString()
  data: Date;

  @IsNotEmpty()
  @IsEnum(TipoTransacao)
  tipo: TipoTransacao;

  @IsNotEmpty()
  @IsEnum(CategoriaTransacao)
  categoria: CategoriaTransacao;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  valor: number;
}
