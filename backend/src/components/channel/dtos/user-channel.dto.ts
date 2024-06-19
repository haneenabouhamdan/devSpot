import { Field, ObjectType } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';
import { IsEnum, IsUUID } from 'class-validator';
import { UserChannelSubscriptionStatus } from '../enums';

@ObjectType()
export class UserChannelDto extends EntityDTO {
  @Field()
  @IsUUID()
  channelId: UUID;

  @Field()
  @IsUUID()
  userId: UUID;

  @Field()
  @IsUUID()
  roleId: UUID;

  @IsEnum(UserChannelSubscriptionStatus)
  @Field(() => UserChannelSubscriptionStatus)
  status: UserChannelSubscriptionStatus;
}
