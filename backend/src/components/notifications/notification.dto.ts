import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NotificationResponse {
  @Field()
  message: string;
}
