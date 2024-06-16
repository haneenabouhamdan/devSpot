import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { IsUUID, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}

@InputType()
export class ChangePasswordInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  currentPassword?: string;

  @IsString()
  @MinLength(8)
  @Field()
  newPassword: string;
}
