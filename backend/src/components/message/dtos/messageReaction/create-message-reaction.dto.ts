import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateMessageReactionDto {
  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  messageId: UUID;

  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  userId: UUID;

  @IsNotEmpty()
  @Field()
  emoji: string;
}
