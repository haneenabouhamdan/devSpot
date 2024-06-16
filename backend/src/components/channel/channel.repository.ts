import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Channel } from './entities';
import { BaseRepository } from '../../common/repositories';

@Injectable()
export class ChannelRepository extends BaseRepository<Channel> {
  constructor(private dataSource: DataSource) {
    super(Channel, dataSource);
  }
}
