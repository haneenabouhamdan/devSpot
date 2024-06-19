import { IsUUID, IsEnum, IsString } from 'class-validator';
import { SubmissionStatus } from '../enums';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubmissionDto {
  @Field()
  @IsUUID()
  challengeId: UUID;

  @Field()
  @IsString()
  submissionText: string;

  @Field()
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @Field()
  @IsUUID()
  createdBy: UUID;
}
