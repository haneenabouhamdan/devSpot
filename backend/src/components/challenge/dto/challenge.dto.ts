import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { ChallengeStatus } from '../enums';
import { EntityDTO } from '../../../common/dtos';
import { IsOptional } from 'class-validator';

@ObjectType()
export class ChallengeDto extends EntityDTO {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => ChallengeStatus, { defaultValue: ChallengeStatus.active })
  status: ChallengeStatus;

  @Field(() => GraphQLUUID)
  createdBy: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  difficultyLevel?: string;
}
