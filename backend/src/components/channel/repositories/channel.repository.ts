import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { Channel } from '../entities';

@Injectable()
export class ChannelRepository extends BaseRepository<Channel> {
  constructor(private dataSource: DataSource) {
    super(Channel, dataSource);
  }
}
