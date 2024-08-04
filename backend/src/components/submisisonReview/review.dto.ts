import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { EntityDTO } from '../../common/dtos';
import { GraphQLUUID } from 'graphql-scalars';
import { IsUUID, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class ReviewDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  createdBy: UUID;

  @Field(() => String, { nullable: true })
  comment: string;

  @Field(() => Number, { nullable: false })
  score: number;
}

@InputType()
export class CreateReviewInput {
  @Field(() => GraphQLUUID)
  @IsUUID()
  createdBy: UUID;

  @Field()
  @IsNumber()
  score: number;

  @Field()
  @IsString()
  comment: string;

  @Field(() => GraphQLUUID)
  @IsUUID()
  submissionId: UUID;
}
