import { GraphQLUUID } from 'graphql-scalars';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateMessageReactionDto } from './create-message-reaction.dto';

@InputType()
export class UpdateMessageReactionDto extends PartialType(
  CreateMessageReactionDto,
) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
