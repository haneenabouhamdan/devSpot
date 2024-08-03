import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ReviewDto } from './review.dto';
import { CreateReviewInput } from '../submission/dto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => ReviewDto)
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ): Promise<ReviewDto> {
    return this.reviewService.createReview(createReviewInput);
  }
}
