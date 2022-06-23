import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, senha: string) {
    try {
      const user = await this.userService.findOneOrFail({ where: { email } });

      const isPasswordValue = compareSync(senha, user.senha);
      if (!isPasswordValue) {
        return null;
      } else {
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}
