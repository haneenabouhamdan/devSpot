import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { In, Repository } from 'typeorm';
import { CreateReviewInput } from './review.dto';
import { Submission, SubmissionReview } from '../submission';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,

    @InjectRepository(SubmissionReview)
    private submissionReviewRepository: Repository<SubmissionReview>,
  ) {}

  async createReview(createReviewInput: CreateReviewInput): Promise<Review> {
    const review = await this.reviewRepository.save(createReviewInput);

    const a = await this.submissionReviewRepository.save({
      reviewId: review.id,
      submissionId: createReviewInput.submissionId,
    });

    return review;
  }

  async getReviewsByChallengeId(challengeId: UUID) {
    const submissions = await this.submissionRepository.find({
      where: { challengeId },
    });
    const submissionReviews = await this.submissionReviewRepository.find({
      where: {
        submissionId: In(submissions.map((submission) => submission.id)),
      },
    });
    return this.reviewRepository.find({
      where: { id: In(submissionReviews.map((sr) => sr.reviewId)) },
    });
  }
}
