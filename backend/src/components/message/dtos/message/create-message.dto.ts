import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { GraphQLString } from 'graphql';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateMessageDto {
  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  senderId: UUID;

  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  channelId: UUID;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Field(() => [GraphQLString], { nullable: true })
  attachments: string[];

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  text: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUUID(4)
  @Field(() => GraphQLUUID, { nullable: true })
  parentMessageId?: UUID;
}
