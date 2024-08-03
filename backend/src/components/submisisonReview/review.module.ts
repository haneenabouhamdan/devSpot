import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Submission, SubmissionReview } from '../submission';

@Module({
  providers: [ReviewService, ReviewResolver],
  imports: [TypeOrmModule.forFeature([Review, Submission, SubmissionReview])],
})
export class ReviewModule {}
