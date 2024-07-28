import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user';
import {
  ChannelDto,
  CreateChannelDto,
  InviteUserDto,
  SubscribeChannelDto,
  UserChannelDto,
} from './dtos';
import { ChannelRepository, UserChannelsRepository } from './repositories';
import { UserChannelSubscriptionStatus } from './enums';
import { DefaultRoles } from '../user/enums';
import { RolesPermissionsService } from '../user/services';
import { UserTokenRepository } from '../user/repositories';
import { In } from 'typeorm';
import { NotificationService } from '../notifications/notification.service';
import { arrayLens } from 'src/common/utilities';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    private readonly userTokenRepository: UserTokenRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private userChannelsRepository: UserChannelsRepository,
    private rolePermissionsService: RolesPermissionsService,
    private notificationService: NotificationService,
  ) {}

  async create(createChannelDto: CreateChannelDto): Promise<ChannelDto> {
    const { createdBy, ...channelData } = createChannelDto;
    const user = await this.userService.findOneById(createdBy);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newChannel = this.channelRepository.create({
      ...channelData,
      createdBy: user.id,
    });

    const newCreatedChannel = await this.channelRepository.save(newChannel);

    const adminRole = await this.rolePermissionsService.fetchDefaultMemberRole(
      DefaultRoles.SUPERADMIN,
    );

    await this.userChannelsRepository.save({
      userId: user.id,
      channelId: newCreatedChannel.id,
      status: UserChannelSubscriptionStatus.ACTIVE,
      roleId: adminRole?.id,
    });

    // subscribe members
    if (createChannelDto.users?.length) {
      await this.inviteUsers({
        channelId: newCreatedChannel.id,
        users: createChannelDto?.users,
        byUser: user,
      });
    }

    return newCreatedChannel;
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

  async inviteUsers(
    inviteUserDto: InviteUserDto,
  ): Promise<UserChannelDto[] | undefined> {
    const { users, channelId, byUser } = inviteUserDto;
    const allUsers = await this.userService.getUsersByEmails(users);
    if (!allUsers) return;

    const newMembers = allUsers.filter(
      async (user) => !(await this.isChannelMember(channelId, user.id)),
    );

    const role = await this.rolePermissionsService.fetchDefaultMemberRole(
      DefaultRoles.MEMBER,
    );

    const newSubscriptions = newMembers.map((user) => ({
      userId: user!.id,
      channelId: inviteUserDto.channelId,
      status: UserChannelSubscriptionStatus.INACTIVE,
      roleId: role?.id,
    }));
    const userIds = arrayLens(newMembers, 'id');

    await this.notifyUsers(userIds, {
      title: 'New Invitation',
      body: `${byUser?.username} invite you to join a channel`,
    });

    return this.userChannelsRepository.save(newSubscriptions);
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

  async isChannelMember(channelId: UUID, userId: UUID) {
    const userChannel = await this.userChannelsRepository.findBy({ channelId });
    const members = userChannel.map((userChannel) => userChannel.userId);
    return members.includes(userId);
  }

  async notifyUsers(
    usersIds: string[],
    message: { title: string; body: string },
  ) {
    const tokens = await this.userTokenRepository.find({
      where: {
        userId: In(usersIds),
      },
    });
    if (!tokens) return;
    return await Promise.all(
      tokens.map(({ token }) => {
        this.notificationService.sendNotification(
          token,
          message.title,
          message.body,
        );
      }),
    );
  }
}
