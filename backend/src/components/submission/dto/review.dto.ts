import { ObjectType, Field } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class ReviewDto extends EntityDTO {
  @Field(() => GraphQLUUID, { nullable: false })
  createdBy: UUID;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: false })
  score: number;
}
