import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class SubscribeChannelDto {
  @Field(() => GraphQLUUID)
  @IsUUID()
  userId: UUID;

  @Field(() => GraphQLUUID)
  @IsUUID()
  channelId: UUID;

  @Field(() => GraphQLUUID)
  @IsUUID()
  roleId: UUID;
}
