import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationResponse } from './notification.dto';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => NotificationResponse)
  async sendNotification(
    @Args('token') token: string,
    @Args('title') title: string,
    @Args('body') body: string,
  ): Promise<NotificationResponse> {
    await this.notificationService.sendNotification(token, title, body);
    return { message: 'Notification sent successfully' };
  }
}
