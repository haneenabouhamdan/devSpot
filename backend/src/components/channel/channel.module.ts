import { Module, forwardRef } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { Channel, UserChannels } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRepository, UserChannelsRepository } from './repositories';
import { ChannelBatches } from './batches';
import { UserRepository, UserModule } from '../user';
import { UserFilter } from '../user/filters';
import { MessageRepository, MessageService } from '../message';
import { UserTokenRepository } from '../user/repositories';
import { NotificationService } from '../notifications/notification.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Channel, UserChannels]),
  ],
  providers: [
    ChannelResolver,
    ChannelService,
    ChannelRepository,
    UserRepository,
    ChannelBatches,
    UserChannelsRepository,
    MessageService,
    MessageRepository,
    UserFilter,
    UserTokenRepository,
    NotificationService,
  ],
  exports: [ChannelService],
})
export class ChannelModule {}
