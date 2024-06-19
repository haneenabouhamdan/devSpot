import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { Channel, UserChannels } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, UserRepository, UserService } from '../user';
import { ChannelRepository, UserChannelsRepository } from './repositories';
import { ChannelBatches } from './batches';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Channel, UserChannels])],
  providers: [
    ChannelResolver,
    ChannelService,
    UserService,
    ChannelRepository,
    UserRepository,
    ChannelBatches,
    UserChannelsRepository,
  ],
})
export class ChannelModule {}
