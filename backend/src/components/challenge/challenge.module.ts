import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { Challenge } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeRepository } from './challenge.repository';
import {
  ReviewRepository,
  Submission,
  SubmissionReviewRepository,
  SubmissionService,
} from '../submission';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Submission])],
  providers: [
    ChallengeResolver,
    ChallengeService,
    ChallengeRepository,
    SubmissionService,
    SubmissionReviewRepository,
    ReviewRepository,
  ],
})
export class ChallengeModule {}
