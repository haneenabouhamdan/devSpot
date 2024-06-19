import { MessageStatus } from '../../enums';
import { EntityDTO } from '../../../../common/dtos';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

@ObjectType()
export class MessageDto extends EntityDTO {
  @Field({ nullable: false })
  senderId: UUID;

  @Field({ nullable: false })
  channelId: UUID;

  @IsOptional()
  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  attachments?: string[];

  @Field(() => MessageStatus)
  @IsEnum(MessageStatus)
  status: MessageStatus;

  @Field({ nullable: true })
  parentMessageId?: UUID;
}

@ObjectType()
export class PinMessageDto extends EntityDTO {
  @Field({ nullable: false })
  userId: UUID;

  @Field({ nullable: false })
  messageId: UUID;
}

@InputType()
export class CreatePinMessageDto {
  @Field({ nullable: false })
  userId: UUID;

  @Field({ nullable: false })
  messageId: UUID;
}
