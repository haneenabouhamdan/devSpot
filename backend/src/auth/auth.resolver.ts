import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Mutation, Args, Query, Resolver } from '@nestjs/graphql';
import { AuthUserDto } from './dto/auth-user.dto';
import { AuthResponseDto } from './dto/responses';
import { SignInInput } from './dto/inputs.dto';
import { AuthIdentifierTransformer } from './transformers';
import { AuthResultType } from './types';
import { AuthUser, SkipAuth } from '../common/decorators';

@Resolver(() => AuthUserDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthUserDto)
  @UseGuards(AuthGuard)
  async getProfile(@AuthUser() user: AuthUserDto): Promise<AuthUserDto> {
    return user;
  }

  @SkipAuth()
  @Mutation(() => AuthResponseDto)
  async signIn(
    @Args('signInInput', AuthIdentifierTransformer) signInInput: SignInInput,
    @AuthUser() user: AuthUserDto,
  ): Promise<AuthResponseDto> {
    const { token } = await this.authService.signIn(
      signInInput.identifier,
      signInInput.password,
    );

    return {
      result: AuthResultType.AUTH_SUCCESS,
      token,
      user,
    };
  }
}
