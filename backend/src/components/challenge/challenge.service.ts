import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto, UpdateChallengeDto } from './dto';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const challenge = this.challengeRepository.create(createChallengeDto);
    return this.challengeRepository.save(challenge);
  }

  findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }

  findOneById(id: UUID): Promise<Nullable<Challenge>> {
    return this.challengeRepository.findOne({ where: { id } });
  }

  async update(
    id: UUID,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    await this.challengeRepository.update(id, updateChallengeDto);
    return this.challengeRepository.save({ ...updateChallengeDto, id });
  }
}
