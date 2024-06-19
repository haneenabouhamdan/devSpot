import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@Entity('pinned_messages')
export class PinnedMessage extends AbstractEntity {
  @Column('uuid')
  userId: UUID;

  @Column('uuid')
  messageId: UUID;
}
