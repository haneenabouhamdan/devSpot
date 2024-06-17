import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { ChannelDto, CreateChannelInput } from './dto';
import { ChannelRepository } from './channel.repository';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userService: UserService,
  ) {}

  async create(createChannelInput: CreateChannelInput): Promise<ChannelDto> {
    const { createdBy, ...channelData } = createChannelInput;
    const user = await this.userService.findOneById(createdBy);

    const newChannel = this.channelRepository.create({
      ...channelData,
      createdBy: user.id,
    });

    return this.channelRepository.save(newChannel);
  }

  findAll(): Promise<ChannelDto[]> {
    return this.channelRepository.find();
  }

  findOneById(id: UUID): Promise<ChannelDto> {
    return this.channelRepository.findOne({ where: { id } });
  }

  findByUserId(userId: UUID): Promise<ChannelDto[]> {
    return this.channelRepository.findBy({ createdBy: userId });
  }
}
