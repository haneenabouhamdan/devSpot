import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class SubscribeChannelDto {
  @Field()
  @IsUUID()
  userId: UUID;

  @Field()
  @IsUUID()
  channelId: UUID;

  @Field()
  @IsUUID()
  roleId: UUID;
}
