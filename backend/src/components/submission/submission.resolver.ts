import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubmissionService } from './submission.service';
import {
  CreateSubmissionDto,
  ReviewDto,
  SubmissionDto,
  UpdateSubmissionDto,
} from './dto';
import { GraphQLUUID } from 'graphql-scalars';

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
  findSubmissionReviewById(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
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
}
