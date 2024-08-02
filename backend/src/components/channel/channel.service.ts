import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserDto, UserService } from '../user';
import {
  ChannelDto,
  CreateChannelDto,
  CreateDmChannelDto,
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
import { arrayLens, recordsToMapAsArray } from 'src/common/utilities';

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
        inviter: user,
        channelName: newCreatedChannel.name,
      });
    }

    return newCreatedChannel;
  }

  async createDM(createDmChannelDto: CreateDmChannelDto): Promise<ChannelDto> {
    const { createdBy, users, description } = createDmChannelDto;
    const user = await this.userService.findOneById(createdBy);
    const allUsers = await this.userService.getUsersByEmails(users);

    if (!user || !allUsers) {
      throw new BadRequestException('User not found');
    }

    const newChannel = this.channelRepository.create({
      name: 'DM',
      description,
      createdBy: user.id,
      isPrivate: true,
      isGroupChat: false,
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

    await this.userChannelsRepository.save({
      userId: allUsers[0].id,
      channelId: newCreatedChannel.id,
      status: UserChannelSubscriptionStatus.ACTIVE,
      roleId: adminRole?.id,
    });

    return newCreatedChannel;
  }

  findAll(): Promise<ChannelDto[]> {
    return this.channelRepository.find();
  }

  findOneById(id: UUID): Promise<Nullable<ChannelDto>> {
    return this.channelRepository.findOne({ where: { id } });
  }

  async getDms(userId: UUID): Promise<ChannelDto[]> {
    const userChannels = await this.userChannelsRepository.findBy({
      userId,
      status: UserChannelSubscriptionStatus.ACTIVE,
    });

    const channelsIds = userChannels.map(
      (userChannel) => userChannel.channelId,
    );

    const dms = await this.channelRepository.find({
      where: { id: In(channelsIds), isPrivate: true, isGroupChat: false },
    });

    const formattedDms = await Promise.all(
      dms.map(async (channel) => {
        const members = await this.getDmChannelMembers(channel.id);
        const receiver = members.filter((member) => member.id !== userId);
        return {
          ...channel,
          name: receiver[0].username,
        } as ChannelDto;
      }),
    );

    return formattedDms;
  }

  async getDmChannelMembers(channelId: UUID) {
    const channels = await this.userChannelsRepository.find({
      where: {
        channelId,
        status: UserChannelSubscriptionStatus.ACTIVE,
      },
      relations: ['user'],
    });
    return channels.map((channel) => channel.user);
  }

  async getSubscribedChannel(userId: UUID): Promise<ChannelDto[]> {
    const userChannels = await this.userChannelsRepository.findBy({
      userId,
      status: UserChannelSubscriptionStatus.ACTIVE,
    });

    const publicChannels = await this.channelRepository.find({
      where: { isPrivate: false },
    });

    const channelsIds = userChannels.map(
      (userChannel) => userChannel.channelId,
    );

    const subscribedChannels = await this.channelRepository.find({
      where: { id: In(channelsIds), isPrivate: true, isGroupChat: true },
    });

    return [...subscribedChannels, ...publicChannels];
  }

  async inviteUsers(
    inviteUserDto: InviteUserDto,
  ): Promise<UserChannelDto[] | undefined> {
    const { users, channelId, inviter, channelName } = inviteUserDto;
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

    await this.notifyUsers(
      userIds,
      inviteUserDto.channelId,
      inviter.username,
      channelName,
    );

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

  //check if user
  async isChannelMember(channelId: UUID, userId: UUID) {
    const userChannel = await this.userChannelsRepository.findBy({
      channelId,
      status: UserChannelSubscriptionStatus.ACTIVE,
    });
    const members = userChannel.map((userChannel) => userChannel.userId);
    return members.includes(userId);
  }

  async notifyUsers(
    usersIds: string[],
    channelId: UUID,
    inviterName: string,
    channelName: string,
  ) {
    const userTokens = await this.userTokenRepository.find({
      where: { userId: In(usersIds) },
    });

    await Promise.all(
      userTokens.map((userData) => {
        return this.notificationService.sendFbNotification(userData.token, {
          text: `Invitation to join ${channelName}`,
          title: `${inviterName} has invited you to join the channel ${channelName}`,
          channelId,
          userId: userData.userId,
        });
      }),
    );
  }

  async acceptInvitation(userId: UUID, channelId: UUID) {
    const invitation = await this.userChannelsRepository.findOne({
      where: { userId, channelId },
    });
    if (!invitation) throw new Error('Invitation not found');

    return await this.userChannelsRepository.update(invitation.id, {
      status: UserChannelSubscriptionStatus.ACTIVE,
    });
  }

  async ignoreInvitation(userId: UUID, channelId: UUID) {
    const invitation = await this.userChannelsRepository.findOne({
      where: { userId, channelId },
    });
    if (!invitation) throw new Error('Invitation not found');

    return await this.userChannelsRepository.update(invitation.id, {
      status: UserChannelSubscriptionStatus.BANNED,
    });
  }
}
