import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateChallengeDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => GraphQLUUID)
  createdBy: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  difficultyLevel?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  status?: string;
}
