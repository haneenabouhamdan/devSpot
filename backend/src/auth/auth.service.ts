import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User, UserService } from '../components/user';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    identifier: string,
    pass: string,
  ): Promise<{ token: string; user: User }> {
    let user: Nullable<User>;

    if (identifier.includes('@')) {
      user = await this.userService.findOneByEmail(identifier);
    } else {
      user = await this.userService.findOneByPhone(identifier);
    }

    if (
      !user?.password
      // || !(await argon2.verify(user.password, pass))
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signUp(
    createUserPayload: CreateUserDto,
  ): Promise<{ token: string; user: User }> {
    if (createUserPayload.phoneNumber) {
      const user = await this.userService.findOneByPhone(
        createUserPayload.phoneNumber,
      );
      if (user) {
        throw new BadRequestException(
          'User with this phone number already exists',
        );
      }
    }
    const password = await argon2.hash(createUserPayload.password);

    const user = await this.userService.create({
      ...createUserPayload,
      password,
    });
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
