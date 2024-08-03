import { ObjectType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { EntityDTO } from '../../../common/dtos';
import { SubmissionStatus } from '../enums';
import { GraphQLUUID } from 'graphql-scalars';
import { UserDto } from 'src/components/user';
import { ReviewDto } from '.';

@ObjectType()
export class SubmissionDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  createdBy: UUID;

  @Field(() => GraphQLUUID, { nullable: false })
  challengeId: UUID;

  @Field({ nullable: false })
  submissionText: string;

  @Field(() => SubmissionStatus)
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @Field(() => UserDto)
  user?: UserDto;

  @Field(() => [ReviewDto])
  reviews?: ReviewDto[];
}
