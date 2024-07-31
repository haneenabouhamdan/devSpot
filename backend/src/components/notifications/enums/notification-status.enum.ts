import { registerEnumType } from '@nestjs/graphql';

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
  DISMISSED = 'DISMISSED',
}

registerEnumType(NotificationStatus, {
  name: 'NotificationStatus',
});
