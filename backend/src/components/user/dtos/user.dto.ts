import { Field, ObjectType } from '@nestjs/graphql';
import { AccountStatus } from '../enums';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { EntityDTO } from '../../../common/dtos';

@ObjectType()
export class UserDto extends EntityDTO {
  @Field()
  username: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  email?: string;

  @Field()
  phoneNumber: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  jobTitle: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field(() => Boolean, { nullable: true })
  notificationPaused: boolean;

  @Field(() => String, { nullable: true })
  profilePicture: string;
}
