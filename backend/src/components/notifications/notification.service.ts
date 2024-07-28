import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: typeof admin,
  ) {}

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const message = {
      notification: {
        title,
        body,
        click_action: 'https://yourapp.com',
      },
      token,
      webpush: {
        notification: {
          actions: [
            {
              action: 'accept',
              title: 'Accept',
            },
            {
              action: 'decline',
              title: 'Decline',
            },
          ],
        },
      },
    };

    try {
      const response = await this.firebaseAdmin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send notification');
    }
  }
}
