import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@Entity('pinned_messages')
export class PinnedMessage extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  userId: UUID;

  @Column({ type: 'uuid', nullable: false })
  messageId: UUID;
}
