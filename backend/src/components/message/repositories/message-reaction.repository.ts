import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { MessageReaction } from '../entities';

@Injectable()
export class MessageReactionRepository extends BaseRepository<MessageReaction> {
  constructor(private dataSource: DataSource) {
    super(MessageReaction, dataSource);
  }
}
