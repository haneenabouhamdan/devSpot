import { ObjectType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { EntityDTO } from '../../../common/dtos';
import { SubmissionStatus } from '../enums';

@ObjectType()
export class SubmissionDto extends EntityDTO {
  @Field({ nullable: false })
  createdBy: UUID;

  @Field({ nullable: false })
  challengeId: UUID;

  @Field({ nullable: false })
  submisisonText: string;

  @Field(() => SubmissionStatus)
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @Field({ nullable: false })
  submissionReviewId: UUID;
}
