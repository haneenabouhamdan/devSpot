import { GraphQLUUID } from 'graphql-scalars';
import { CreateMessageDto } from './create-message.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
