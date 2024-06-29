import { MessageStatus } from '../../enums';
import { EntityDTO } from '../../../../common/dtos';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class MessageDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  senderId: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  channelId: UUID;

  @IsOptional()
  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  attachments?: string[];

  @Field(() => MessageStatus)
  @IsEnum(MessageStatus)
  status: MessageStatus;

  @Field(() => GraphQLUUID, { nullable: true })
  parentMessageId?: UUID;
}

@ObjectType()
export class PinMessageDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  userId: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  messageId: UUID;
}

@InputType()
export class CreatePinMessageDto {
  @Field(() => GraphQLUUID, { nullable: false })
  userId: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  messageId: UUID;
}
