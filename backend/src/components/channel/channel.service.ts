import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user';
import { CreateChannelInput } from './dto';
import { Channel } from './entities';
import { ChannelRepository } from './channel.repository';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createChannelInput: CreateChannelInput): Promise<Channel> {
    const { createdBy, ...channelData } = createChannelInput;
    const user = await this.userRepository.findOneOrFail({
      where: { id: createdBy },
    });

    const newChannel = this.channelRepository.create({
      ...channelData,
      createdBy: user.id,
    });

    return this.channelRepository.save(newChannel);
  }

  findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  findOneById(id: UUID): Promise<Channel> {
    return this.channelRepository.findOne({ where: { id } });
  }
}
