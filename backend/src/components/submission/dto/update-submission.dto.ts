import { GraphQLUUID } from 'graphql-scalars';
import { CreateSubmissionDto } from './create-submission.dto';
import { InputType, Field, PartialType, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
