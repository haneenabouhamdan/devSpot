import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Message } from '../entities';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource);
  }
}
