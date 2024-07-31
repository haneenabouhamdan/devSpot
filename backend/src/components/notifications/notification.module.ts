import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { NotificationRepository } from './notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [
    NotificationService,
    NotificationResolver,
    NotificationRepository,
  ],
})
export class NotificationModule {}
