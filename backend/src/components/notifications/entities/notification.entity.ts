import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';
import { NotificationStatus } from '../enums';

@Entity('notifications')
export class Notification extends AbstractEntity {
  @Column({ nullable: true }) userId: string;

  @Column({ nullable: true }) messageId: string;

  @Column({ nullable: true }) challengeId: string;

  @Column() title: string;

  @Column({ nullable: false }) text: string;

  @Column({ nullable: true }) channelId: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;
}
