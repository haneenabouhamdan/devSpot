import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PinnedMessage } from '../entities';

@Injectable()
export class PinnedMessageRepository extends BaseRepository<PinnedMessage> {
  constructor(private dataSource: DataSource) {
    super(PinnedMessage, dataSource);
  }
}
