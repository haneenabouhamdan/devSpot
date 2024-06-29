import { GraphQLUUID } from 'graphql-scalars';
import { EntityDTO } from '../../../../common/dtos';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageReactionDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  messageId: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  userId: UUID;

  @Field({ nullable: false })
  emoji: string;
}
