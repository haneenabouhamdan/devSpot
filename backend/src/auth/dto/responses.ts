import { ObjectType, Field } from '@nestjs/graphql';
import { AuthUserDto } from './auth-user.dto';
import { AuthResultType } from '../types';

@ObjectType()
export class AuthResponseDto {
  @Field(() => AuthResultType)
  result: AuthResultType;

  @Field({ nullable: true })
  token?: string;

  @Field(() => AuthUserDto, { nullable: true })
  user?: AuthUserDto;
}
