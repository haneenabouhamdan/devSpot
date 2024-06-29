import { AbstractEntity } from '../../../common/entities';
import { Entity, Column } from 'typeorm';
import { SubmissionStatus } from '../enums';

@Entity('submissions')
export class Submission extends AbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  createdBy: UUID;

  @Column({ type: 'uuid', nullable: false })
  challengeId: UUID;

  @Column({ type: 'text' })
  submissionText: string;

  @Column({ type: 'enum', enum: SubmissionStatus })
  status: SubmissionStatus;
}
