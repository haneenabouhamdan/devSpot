import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserChannelsRepository } from '../repositories';
import { User } from '../../user';
import { UserChannelSubscriptionStatus } from '../enums';

@Injectable()
export class ChannelBatches {
  constructor(private userChannelsRepository: UserChannelsRepository) {}

  async members(channelIds: UUID[]): Promise<Map<UUID, User[]>> {
    const userChannels = await this.userChannelsRepository.find({
      where: {
        channelId: In(channelIds),
        status: UserChannelSubscriptionStatus.ACTIVE,
      },
      relations: ['user'],
    });

    const usersByChannelId = new Map<UUID, User[]>();

    userChannels.forEach((userChannel) => {
      if (!usersByChannelId.has(userChannel.channelId)) {
        usersByChannelId.set(userChannel.channelId, []);
      }
      usersByChannelId.get(userChannel.channelId).push(userChannel.user);
    });

    return usersByChannelId;
  }
}
