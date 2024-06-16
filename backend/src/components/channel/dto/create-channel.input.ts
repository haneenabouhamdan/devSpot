import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateChannelInput {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  name: UUID;

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

  @Field()
  @IsUUID()
  createdBy: UUID;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  photo?: string;
}
