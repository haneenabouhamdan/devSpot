import { ObjectType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { EntityDTO } from '../../../common/dtos';
import { SubmissionStatus } from '../enums';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class SubmissionDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  createdBy: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  challengeId: UUID;

  @Field({ nullable: false })
  submisisonText: string;

  @Field(() => SubmissionStatus)
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @Field(() => GraphQLUUID, { nullable: false })
  submissionReviewId: UUID;
}
