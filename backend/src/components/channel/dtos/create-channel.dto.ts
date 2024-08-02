import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateChannelDto {
  @IsString()
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isGroupChat?: boolean;

  @Field(() => GraphQLUUID)
  @IsUUID()
  createdBy: UUID;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  photo?: string;

  @Field(() => [String])
  @IsArray()
  users: string[];
}

@InputType()
export class CreateDmChannelDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLUUID)
  @IsUUID()
  createdBy: UUID;

  @Field(() => [String])
  @IsArray()
  users: string[];
}
