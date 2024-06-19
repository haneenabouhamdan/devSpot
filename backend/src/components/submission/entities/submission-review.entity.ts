import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';

@Entity('submission_reviews')
export class SubmissionReview extends AbstractEntity {
  @Column()
  submissionId: UUID;

  @Column()
  review: UUID;
}
