import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import {
  MessageReactionRepository,
  MessageRepository,
  PinnedMessageRepository,
} from './repositories';
import { Message, MessageReaction, PinnedMessage } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageReaction, PinnedMessage]),
  ],
  providers: [
    MessageResolver,
    MessageService,
    MessageRepository,
    MessageReactionRepository,
    PinnedMessageRepository,
  ],
})
export class MessageModule {}
