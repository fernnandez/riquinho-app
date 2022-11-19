import { IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/utils/message.helper';
import { RegexHelper } from 'src/utils/regex.helper';
export class UpdateSenhaUserDto {
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.passwordValid,
  })
  lastSenha: string;
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.passwordValid,
  })
  senha: string;
}
