import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repositories';
import { Notification } from './entities';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor(private dataSource: DataSource) {
    super(Notification, dataSource);
  }
}
