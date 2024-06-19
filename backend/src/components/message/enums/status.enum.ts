import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  PENDING = 'pending',
  FAILED = 'failed',
}
registerEnumType(MessageStatus, {
  name: 'MessageStatus',
  description: 'The status of the message',
});
