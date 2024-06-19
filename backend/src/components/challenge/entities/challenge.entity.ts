import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';
import { ChallengeStatus } from '../enums';

@Entity('challenges')
export class Challenge extends AbstractEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ChallengeStatus,
    default: ChallengeStatus.active,
  })
  status: ChallengeStatus;

  @Column('uuid')
  createdBy: UUID;

  @Column('text')
  difficultyLevel: string;
}
