import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@Entity('message_reactions')
export class MessageReaction extends AbstractEntity {
  @Column('uuid')
  messageId: UUID;

  @Column('uuid')
  userId: UUID;

  @Column({ type: 'text', nullable: false })
  emoji: string;
}
