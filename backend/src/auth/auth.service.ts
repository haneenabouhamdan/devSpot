import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '../components/user';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(identifier: string, pass: string): Promise<{ token: string }> {
    let user: User;
    if (identifier.includes('@')) {
      user = await this.userService.findOneByEmail(identifier);
    } else {
      user = await this.userService.findOneByPhone(identifier);
    }
    console.log({ user });
    if (!user?.password || !(await argon2.verify(user.password, pass))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
