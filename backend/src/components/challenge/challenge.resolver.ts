import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entities/challenge.entity';
import { ChallengeDto, CreateChallengeDto, UpdateChallengeDto } from './dto';

@Resolver(() => ChallengeDto)
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Mutation(() => ChallengeDto)
  createChallenge(
    @Args('CreateChallengeDto') CreateChallengeDto: CreateChallengeDto,
  ) {
    return this.challengeService.create(CreateChallengeDto);
  }

  @Query(() => [ChallengeDto], { name: 'challenges' })
  findAll() {
    return this.challengeService.findAll();
  }

  @Query(() => ChallengeDto, { name: 'challenge' })
  findOne(@Args('id') id: UUID) {
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
}
