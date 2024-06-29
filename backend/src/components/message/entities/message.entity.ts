import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';
import { MessageStatus } from '../enums';

@Entity('messages')
export class Message extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  senderId: UUID;

  @Column({ type: 'uuid', nullable: false })
  channelId: UUID;

  @Column({ type: 'text', nullable: true })
  text?: string;

  @Column({ type: 'simple-array', nullable: true })
  attachments: string[];

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.SENT,
  })
  status: MessageStatus;

  @Column('uuid', { nullable: true })
  parentMessageId?: UUID;
}
