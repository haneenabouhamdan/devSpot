import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity('message_reactions')
export class MessageReaction extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  messageId: UUID;

  @Column({ type: 'uuid', nullable: false })
  userId: UUID;

  @Column({ type: 'text', nullable: false })
  emoji: string;

  @ManyToOne(() => Message, (message: Message) => message.messageReactions)
  message: Message;
}
