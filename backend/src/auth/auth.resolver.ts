import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { Mutation, Args, Query, Resolver } from '@nestjs/graphql';
import { AuthResponseDto, RegistrationResponseDto } from './dto/responses';
import { SignInInput } from './dto/inputs.dto';
import { AuthResultType } from './types';
import { AuthUser, SkipAuth } from '../common/decorators';
import { CreateUserDto } from '../components';
import { LocalAuthGuard } from './guards';
import { AuthUserDto } from 'src/common/dtos/auth-user.dto';

@Resolver(() => AuthUserDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthUserDto)
  @UseGuards(AuthGuard)
  async getProfile(@AuthUser() user: AuthUserDto): Promise<AuthUserDto> {
    return user;
  }

  @Mutation(() => AuthResponseDto)
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<AuthResponseDto> {
    const { token, user } = await this.authService.signIn(
      signInInput.identifier,
      signInInput.password,
    );

    return {
      result: AuthResultType.AUTH_SUCCESS,
      token,
      user,
    };
  }

  @SkipAuth()
  @Mutation(() => RegistrationResponseDto)
  async signUp(
    @Args('signUpInput') signUpInput: CreateUserDto,
  ): Promise<RegistrationResponseDto> {
    console.log({ signUpInput });
    const { token } = await this.authService.signUp(signUpInput);
    return {
      result: AuthResultType.AUTH_SUCCESS,
      token,
      user: undefined,
    };
  }
}
