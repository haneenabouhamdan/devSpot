import { ObjectType, Field } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';

@ObjectType()
export class ReviewDto extends EntityDTO {
  @Field({ nullable: false })
  createdBy: UUID;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: false })
  score: number;
}
