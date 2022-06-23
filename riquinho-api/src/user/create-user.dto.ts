import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/utils/message.helper';
import { RegexHelper } from 'src/utils/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.passwordValid,
  })
  senha: string;
}
