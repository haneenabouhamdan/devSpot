import { AbstractEntity } from '../../../common/entities';
import { Entity, Column } from 'typeorm';
import { SubmissionStatus } from '../enums';

@Entity('submissions')
export class Submission extends AbstractEntity {
  @Column()
  createdBy: UUID;

  @Column('uuid')
  challengeId: UUID;

  @Column({ type: 'text' })
  submissionText: string;

  @Column({ type: 'enum', enum: SubmissionStatus })
  status: SubmissionStatus;
}
