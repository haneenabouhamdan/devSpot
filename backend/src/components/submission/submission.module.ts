import { Module } from '@nestjs/common';
import { SubmissionResolver } from './submission.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user';
import { Submission, Review, SubmissionReview } from './entities';
import { ReviewRepository, SubmissionRepository } from './repositories';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Submission,
      Review,
      SubmissionRepository,
      SubmissionReview,
      ReviewRepository,
      UserRepository,
    ]),
  ],
  providers: [SubmissionResolver, SubmissionService],
})
export class SubmissionModule {}
