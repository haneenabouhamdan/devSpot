import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  NotificationDto,
  NotificationInput,
  NotificationResponse,
  NotificationsFilters,
} from './dtos';
import { NotificationStatus } from './enums';
import { SkipAuth } from 'src/common/decorators';

@Resolver(() => NotificationDto)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => NotificationResponse)
  @SkipAuth()
  async sendfbNotification(
    @Args('token') token: string,
    @Args('NotificationInput')
    notificationInput: NotificationInput,
  ): Promise<NotificationResponse> {
    try {
      console.log('Payload received:', notificationInput);
      await this.notificationService.sendFbNotification(
        token,
        notificationInput,
      );
      return { message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Failed to send notification');
    }
  }

  @Mutation(() => NotificationResponse)
  async sendNotification(
    @Args('CreateNotificationDto') createNotificationDto: CreateNotificationDto,
  ) {
    return await this.notificationService.saveNotification(
      createNotificationDto,
    );
  }

  @Query(() => [NotificationDto], { name: 'notifications' })
  async getNotifications(
    @Args('filters', { type: () => NotificationsFilters })
    filters: NotificationsFilters,
  ): Promise<NotificationDto[]> {
    return this.notificationService.getList(filters);
  }

  @Mutation(() => NotificationResponse, { name: 'updateStatus' })
  async updateStatus(
    @Args('id') id: string,
    @Args('status') status: string,
  ): Promise<NotificationResponse> {
    await this.notificationService.updateNotification({
      id,
      status: status as NotificationStatus,
    });
    return { message: 'Notification updated successfully' };
  }
}
