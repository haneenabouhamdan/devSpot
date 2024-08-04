import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { In, Repository } from 'typeorm';
import { CreateReviewInput } from './review.dto';
import { Submission, SubmissionReview } from '../submission';
import { SubmissionStatus } from '../submission/enums';

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

    await this.submissionReviewRepository.save({
      reviewId: review.id,
      submissionId: createReviewInput.submissionId,
    });
    const status =
      review.score > 3 ? SubmissionStatus.ACCEPTED : SubmissionStatus.REJECTED;

    await this.submissionRepository.update(createReviewInput.submissionId, {
      status,
    });

    return review;
  }

  async getReviewsBySubmissionId(submissionId: UUID) {
    const submissionReviews = await this.submissionReviewRepository.find({
      where: {
        submissionId,
      },
    });
    return this.reviewRepository.find({
      where: { id: In(submissionReviews.map((sr) => sr.reviewId)) },
    });
  }
}
