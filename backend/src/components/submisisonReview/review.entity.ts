import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/entities';

@Entity('reviews')
export class Review extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  createdBy: UUID;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int' })
  score: number;
}
