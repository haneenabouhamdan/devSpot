import { IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';
import { SubmissionStatus } from '../enums';
import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class CreateSubmissionDto {
  @Field(() => GraphQLUUID)
  @IsUUID()
  challengeId: UUID;

  @Field()
  @IsString()
  submissionText: string;

  @IsOptional()
  @Field(() => SubmissionStatus)
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @Field(() => GraphQLUUID)
  @IsUUID()
  createdBy: UUID;
}
