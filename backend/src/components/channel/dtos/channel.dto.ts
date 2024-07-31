import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';
import { GraphQLUUID } from 'graphql-scalars';
import { IsUUID } from 'class-validator';

@ObjectType()
export class ChannelDto extends EntityDTO {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Boolean, { nullable: true })
  isPrivate: boolean;

  @Field(() => Boolean, { nullable: true })
  isGroupChat: boolean;

  @Field(() => GraphQLUUID, { nullable: false })
  createdBy: UUID;

  @Field({ nullable: true })
  photo: string;
}
@InputType()
export class InvitationInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  channelId: string;
}
