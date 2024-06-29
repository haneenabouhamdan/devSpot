import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user';
import {
  ChannelDto,
  CreateChannelDto,
  SubscribeChannelDto,
  UserChannelDto,
} from './dtos';
import { ChannelRepository, UserChannelsRepository } from './repositories';
import { UserChannelSubscriptionStatus } from './enums';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private userChannelsRepository: UserChannelsRepository,
  ) {}

  async create(CreateChannelDto: CreateChannelDto): Promise<ChannelDto> {
    const { createdBy, ...channelData } = CreateChannelDto;
    const user = await this.userService.findOneById(createdBy);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newChannel = this.channelRepository.create({
      ...channelData,
      createdBy: user.id,
    });

    await this.userChannelsRepository.save({
      userId: user.id,
      channelId: newChannel.id,
    });

    return this.channelRepository.save(newChannel);
  }

  findAll(): Promise<ChannelDto[]> {
    return this.channelRepository.find();
  }

  findOneById(id: UUID): Promise<Nullable<ChannelDto>> {
    return this.channelRepository.findOne({ where: { id } });
  }

  findByUserId(userId: UUID): Promise<ChannelDto[]> {
    return this.channelRepository.findBy({ createdBy: userId });
  }

  async subscribe(subscribeDto: SubscribeChannelDto): Promise<UserChannelDto> {
    const { channelId, userId, roleId } = subscribeDto;

    // Check if the user is already subscribed to the channel
    const existingSubscription = await this.userChannelsRepository.findOne({
      where: { channelId, userId },
    });

    if (existingSubscription) {
      throw new Error('User is already subscribed to this channel');
    }

    const userChannel = {
      userId,
      channelId,
      status: UserChannelSubscriptionStatus.ACTIVE,
      roleId,
    };

    return this.userChannelsRepository.save(userChannel);
  }
}
