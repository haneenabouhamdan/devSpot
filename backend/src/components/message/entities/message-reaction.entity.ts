import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@Entity('message_reactions')
export class MessageReaction extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  messageId: UUID;

  @Column({ type: 'uuid', nullable: false })
  userId: UUID;

  @Column({ type: 'text', nullable: false })
  emoji: string;
}
