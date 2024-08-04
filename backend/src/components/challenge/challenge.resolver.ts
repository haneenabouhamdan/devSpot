import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entities/challenge.entity';
import { ChallengeDto, CreateChallengeDto, UpdateChallengeDto } from './dto';
import { GraphQLUUID } from 'graphql-scalars';
import { SubmissionDto } from '../submission/dto';
import { SubmissionService } from '../submission';

@Resolver(() => ChallengeDto)
export class ChallengeResolver {
  constructor(
    private readonly challengeService: ChallengeService,
    private submissionService: SubmissionService,
  ) {}

  @Mutation(() => ChallengeDto)
  createChallenge(
    @Args('CreateChallengeDto') createChallengeDto: CreateChallengeDto,
  ) {
    return this.challengeService.create(createChallengeDto);
  }

  @Query(() => [ChallengeDto], { name: 'challenges' })
  findAll() {
    return this.challengeService.findAll();
  }

  @Query(() => ChallengeDto, { name: 'challenge' })
  findOne(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
    return this.challengeService.findOneById(id);
  }

  @Mutation(() => ChallengeDto)
  updateChallenge(
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeDto,
  ) {
    return this.challengeService.update(
      updateChallengeInput.id,
      updateChallengeInput,
    );
  }
  @ResolveField(() => [SubmissionDto])
  async submissions(@Parent() challenge: Challenge): Promise<SubmissionDto[]> {
    const submissions = await this.submissionService.findByChallengeId([
      challenge.id,
    ]);

    return submissions || [];
  }
}
