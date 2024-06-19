import { GraphQLUUID } from 'graphql-scalars';
import { CreateChallengeDto } from './create-challenge.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
