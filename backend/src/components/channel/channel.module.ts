import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { Channel } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, UserRepository } from '../user';
import { ChannelRepository } from './channel.repository';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Channel])],
  providers: [
    ChannelResolver,
    ChannelService,
    UserRepository,
    ChannelRepository,
  ],
})
export class ChannelModule {}
