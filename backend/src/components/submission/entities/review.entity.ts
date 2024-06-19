import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/entities';
import { User } from '../../user';
import { SubmissionReview } from './submission-review.entity';

@Entity('reviews')
export class Review extends AbstractEntity {
  @Column()
  createdBy: UUID;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int' })
  score: number;
}
