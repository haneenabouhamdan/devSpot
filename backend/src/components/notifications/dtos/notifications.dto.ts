import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsUUID, IsString, IsOptional, IsArray } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { NotificationStatus } from '../enums';

@InputType()
export class CreateNotificationDto {
  @Field()
  @IsOptional()
  userId: string;

  @IsOptional()
  @Field()
  channelId?: string;

  @IsOptional()
  @Field()
  messageId?: string;

  @Field(() => NotificationStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status?: NotificationStatus;

  @Field({ nullable: false })
  @IsString()
  text: string;

  @Field({ nullable: false })
  @IsString()
  title: string;
}

@ObjectType()
export class NotificationResponse {
  @Field()
  message: string;
}

@InputType()
export class NotificationsFilters {
  @IsUUID()
  @IsOptional()
  @Field(() => GraphQLUUID)
  userId?: UUID;

  @Field(() => [NotificationStatus], { nullable: true })
  @IsOptional()
  @IsArray()
  statuses?: NotificationStatus[];
}

@ObjectType('Notification')
export class NotificationDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  messageId: string;

  @Field()
  title: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  channelId: string;

  @Field((type) => NotificationStatus)
  status: NotificationStatus;
}

@InputType()
export class NotificationInput {
  @Field({ nullable: false })
  @IsString()
  title: string;

  @Field({ nullable: false })
  @IsString()
  text: string;

  @Field({ nullable: true })
  @IsOptional()
  channelId?: string;

  @Field({ nullable: true })
  @IsOptional()
  messageId?: string;

  @Field({ nullable: true })
  @IsOptional()
  challengeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: string;
}
