import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Challenge } from './entities';
import { BaseRepository } from '../../common/repositories';

@Injectable()
export class ChallengeRepository extends BaseRepository<Challenge> {
  constructor(private dataSource: DataSource) {
    super(Challenge, dataSource);
  }
}
