import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity('submission_reviews')
export class SubmissionReview extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  submissionId: UUID;

  @Column({ type: 'uuid', nullable: false })
  reviewId: UUID;
}
