import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { UserChannels } from '../entities';

@Injectable()
export class UserChannelsRepository extends BaseRepository<UserChannels> {
  constructor(private dataSource: DataSource) {
    super(UserChannels, dataSource);
  }
}
