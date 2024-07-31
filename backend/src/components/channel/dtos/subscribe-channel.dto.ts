import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { UserDto } from 'src/components/user';

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

@InputType()
export class InviteUserDto {
  @Field(() => [String])
  @IsArray()
  users: string[];

  @Field(() => GraphQLUUID)
  @IsUUID()
  channelId: UUID;

  @Field(() => GraphQLUUID)
  @IsUUID()
  roleId?: UUID;

  @Field(() => UserDto)
  inviter: UserDto;

  @Field(() => String)
  channelName: string;
}
