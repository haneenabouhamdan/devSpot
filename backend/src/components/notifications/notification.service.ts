import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  CreateNotificationDto,
  NotificationDto,
  NotificationInput,
  NotificationsFilters,
} from './dtos';
import { NotificationRepository } from './notification.repository';
import { In } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
    private readonly notificationRepo: NotificationRepository,
  ) {}

  async sendFbNotification(
    token: string,
    payload: NotificationInput,
  ): Promise<void> {
    const message = {
      token: token,
      notification: {
        title: payload.title,
        body: payload.text,
      },
      data: {
        ...(payload.channelId && { channelId: payload.channelId }),
        ...(payload.userId && { userId: payload.userId }),
        ...(payload.messageId && { messageId: payload.messageId }),
        ...(payload.challengeId && { challengeId: payload.challengeId }),
      },

      webpush: {
        notification: {
          actions: [
            {
              action: 'accept', //function to accept
              title: 'Accept',
            },
            {
              action: 'decline', //erase notification
              title: 'Decline',
            },
          ],
        },
      },
    };

    //save entity id in the paylaod
    try {
      const response = await this.firebaseAdmin.messaging().send(message);
      console.log('Successfully sent message:', response);
      await this.saveNotificationToDB(payload);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send notification');
    }
  }
  async saveNotificationToDB(body: NotificationInput): Promise<void> {
    const notification = {
      userId: body.userId,
      title: body.title,
      text: body.text,
      messageId: body.messageId,
      channelId: body.channelId,
      challengeId: body.challengeId,
    };

    await this.notificationRepo.save(notification);
  }

  async saveNotification(notificationDto: CreateNotificationDto) {
    return await this.notificationRepo.save(notificationDto);
  }

  async updateNotification(
    notificationDto: Partial<CreateNotificationDto> & { id: string },
  ) {
    return await this.notificationRepo.update(
      notificationDto.id,
      notificationDto,
    );
  }

  async getList(filters: NotificationsFilters): Promise<NotificationDto[]> {
    const conditions: any = {};

    if (filters.userId) {
      conditions.userId = filters.userId;
    }

    if (filters.statuses && filters.statuses.length > 0) {
      conditions.status = In(filters.statuses);
    }

    try {
      const notifications = await this.notificationRepo.find({
        where: conditions,
      });
      return notifications;
    } catch (error) {
      throw new Error('Failed to retrieve notifications');
    }
  }
}
