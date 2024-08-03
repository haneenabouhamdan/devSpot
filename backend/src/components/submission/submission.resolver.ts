import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { SubmissionService } from './submission.service';
import {
  CreateSubmissionDto,
  ReviewDto,
  SubmissionDto,
  UpdateSubmissionDto,
} from './dto';
import { GraphQLUUID } from 'graphql-scalars';
import { Submission } from './entities';

@Resolver(() => SubmissionDto)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Mutation(() => SubmissionDto)
  createSubmission(
    @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionDto,
  ) {
    return this.submissionService.create(createSubmissionInput);
  }

  @Query(() => [SubmissionDto], { name: 'submissions' })
  findAll() {
    return this.submissionService.findAll();
  }

  @Query(() => SubmissionDto, { name: 'submission' })
  findOne(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
    return this.submissionService.findOneById(id);
  }

  @Query(() => [ReviewDto], { name: 'reviewsBySubmissionId' })
  findReviewsBySubmissionId(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
    return this.submissionService.findSubmissionReviewById(id);
  }

  @Mutation(() => SubmissionDto)
  updateSubmission(
    @Args('updateSubmissionInput') updateSubmissionInput: UpdateSubmissionDto,
  ) {
    return this.submissionService.update(
      updateSubmissionInput.id,
      updateSubmissionInput,
    );
  }

  @ResolveField(() => [ReviewDto])
  async reviews(@Parent() submission: Submission): Promise<ReviewDto[]> {
    const reviews = await this.submissionService.findSubmissionReviewById(
      submission.id,
    );
    return reviews || [];
  }
}
