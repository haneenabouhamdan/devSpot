import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { Channel } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, UserRepository, UserService } from '../user';
import { ChannelRepository } from './channel.repository';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Channel])],
  providers: [
    ChannelResolver,
    ChannelService,
    UserService,
    ChannelRepository,
    UserRepository,
  ],
})
export class ChannelModule {}
