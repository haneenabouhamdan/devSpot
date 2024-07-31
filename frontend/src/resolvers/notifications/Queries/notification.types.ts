import { NotificationStatus } from '../enums';

export interface NotificationDto {
  notifications: {
    id: string;
    userId: string;
    messageId: string | null;
    title: string;
    text: string;
    channelId: string;
    status: NotificationStatus;
  }[];
}
