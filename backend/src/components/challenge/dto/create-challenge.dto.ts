import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { ChallengeStatus } from '../enums';
import { SubmissionStatus } from 'src/components/submission/enums';

@InputType()
export class CreateChallengeDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => GraphQLUUID)
  createdBy: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  difficultyLevel?: string;

  @IsOptional()
  @IsString()
  @Field(() => ChallengeStatus, { nullable: true })
  status?: ChallengeStatus;
}

@InputType()
export class CreateChallengeAnswerDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  submissionText: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => GraphQLUUID)
  createdBy: string;

  @IsOptional()
  @IsString()
  @Field(() => SubmissionStatus, { nullable: true })
  status?: SubmissionStatus;
}
