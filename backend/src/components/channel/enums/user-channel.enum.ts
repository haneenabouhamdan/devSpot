import { registerEnumType } from '@nestjs/graphql';

export enum UserChannelSubscriptionStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  BANNED = 'banned',
}
registerEnumType(UserChannelSubscriptionStatus, {
  name: 'UserChannelSubscriptionStatus',
  description: 'status',
});
