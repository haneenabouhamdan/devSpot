import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { CreateChannelInput } from './create-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelInput extends PartialType(CreateChannelInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
