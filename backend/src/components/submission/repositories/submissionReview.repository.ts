import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { SubmissionReview } from '../entities';

@Injectable()
export class SubmissionReviewRepository extends BaseRepository<SubmissionReview> {
  constructor(private dataSource: DataSource) {
    super(SubmissionReview, dataSource);
  }
}
