import { Field, ObjectType } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';
import { IsEnum, IsUUID } from 'class-validator';
import { UserChannelSubscriptionStatus } from '../enums';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class UserChannelDto extends EntityDTO {
  @Field(() => GraphQLUUID)
  @IsUUID()
  channelId: UUID;

  @Field(() => GraphQLUUID)
  @IsUUID()
  userId: UUID;

  @Field(() => GraphQLUUID)
  @IsUUID()
  roleId: UUID;

  @IsEnum(UserChannelSubscriptionStatus)
  @Field(() => UserChannelSubscriptionStatus)
  status: UserChannelSubscriptionStatus;
}
