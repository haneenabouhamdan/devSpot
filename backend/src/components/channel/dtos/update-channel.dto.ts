import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { CreateChannelDto } from './create-channel.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
