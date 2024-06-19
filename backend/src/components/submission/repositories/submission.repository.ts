import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { Submission } from '../entities';
import { SubmissionStatus } from '../enums';

@Injectable()
export class SubmissionRepository extends BaseRepository<Submission> {
  constructor(private dataSource: DataSource) {
    super(Submission, dataSource);
  }
  async findSubmissionsByStatus(
    status: SubmissionStatus,
  ): Promise<Submission[]> {
    return this.find({
      where: { status },
      relations: ['created_by', 'submission_reviews'],
    });
  }

  async findSubmissionsByUser(userId: UUID): Promise<Submission[]> {
    return this.find({
      where: { createdBy: userId },
      relations: ['created_by', 'submission_reviews'],
    });
  }
}
