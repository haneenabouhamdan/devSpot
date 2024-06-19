import { EntityDTO } from '../../../../common/dtos';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageReactionDto extends EntityDTO {
  @Field({ nullable: false })
  messageId: UUID;

  @Field({ nullable: false })
  userId: UUID;

  @Field({ nullable: false })
  emoji: string;
}
