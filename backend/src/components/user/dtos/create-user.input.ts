import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { GraphQLString } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @IsString()
  @MinLength(9)
  @MaxLength(20)
  phoneNumber: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @Field(() => [GraphQLString], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];
}
