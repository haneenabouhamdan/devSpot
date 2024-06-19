import { Module } from '@nestjs/common';
import { SubmissionResolver } from './submission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user';
import { Submission, Review, SubmissionReview } from './entities';
import {
  ReviewRepository,
  SubmissionRepository,
  SubmissionReviewRepository,
} from './repositories';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Submission,
      Review,
      SubmissionRepository,
      SubmissionReview,
      SubmissionReviewRepository,
      ReviewRepository,
    ]),
  ],
  providers: [SubmissionResolver, SubmissionService],
})
export class SubmissionModule {}
