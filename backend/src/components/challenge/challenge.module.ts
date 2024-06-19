import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { Challenge } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeRepository } from './challenge.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeResolver, ChallengeService, ChallengeRepository],
})
export class ChallengeModule {}
