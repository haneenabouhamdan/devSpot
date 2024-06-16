import { Field, ObjectType } from '@nestjs/graphql';
import { EntityDTO } from '../../../common/dtos';

@ObjectType()
export class ChannelDto extends EntityDTO {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Boolean, { nullable: true })
  isPrivate: boolean;

  @Field(() => Boolean, { nullable: true })
  isGroupChat: boolean;

  @Field({ nullable: false })
  createdBy: UUID;

  @Field({ nullable: true })
  photo: string;
}
