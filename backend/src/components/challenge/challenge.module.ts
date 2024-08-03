import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { Challenge } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeRepository } from './challenge.repository';
import {
  Review,
  ReviewRepository,
  Submission,
  SubmissionReview,
  SubmissionService,
} from '../submission';
import { UserRepository, UserService } from '../user';
import { UserTokenRepository } from '../user/repositories';
import { UserFilter } from '../user/filters';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, Submission, SubmissionReview, Review]),
  ],
  providers: [
    ChallengeResolver,
    ChallengeService,
    ChallengeRepository,
    SubmissionService,
    ReviewRepository,
    UserService,
    UserRepository,
    UserTokenRepository,
    UserFilter,
  ],
})
export class ChallengeModule {}
