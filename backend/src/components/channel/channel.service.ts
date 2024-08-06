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
  CreateDmChannelDto,
  InviteUserDto,
  SubscribeChannelDto,
  UserChannelDto,
} from './dtos';
import { ChannelRepository, UserChannelsRepository } from './repositories';
import { UserChannelSubscriptionStatus } from './enums';
import { DefaultRoles } from '../user/enums';
import { RolesPermissionsService } from '../user/services';
import { In } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    private readonly channelRepository: ChannelRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private userChannelsRepository: UserChannelsRepository,
    private rolePermissionsService: RolesPermissionsService,
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

    if (!user || !allUsers?.length) {
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
      status: UserChannelSubscriptionStatus.INACTIVE,
      roleId: adminRole?.id,
    });

    await this.userChannelsRepository.save({
      userId: allUsers[0]?.id,
      channelId: newCreatedChannel.id,
      status: UserChannelSubscriptionStatus.INACTIVE,
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
          name: receiver[0]?.username ?? 'Dm',
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

    const subscribedChannels = channelsIds
      ? await this.channelRepository.find({
          where: { id: In(channelsIds), isPrivate: true, isGroupChat: true },
        })
      : [];

    const allChannels = [...subscribedChannels, ...publicChannels].filter(
      (channel) => this.isChannelMember(channel.id, userId),
    );

    return allChannels;
  }

  async inviteUsers(
    inviteUserDto: InviteUserDto,
  ): Promise<UserChannelDto[] | undefined> {
    const { users, inviter, channelName } = inviteUserDto;
    const allUsers = await this.userService.getUsersByEmails(users);

    if (!allUsers) return;

    const role = await this.rolePermissionsService.fetchDefaultMemberRole(
      DefaultRoles.MEMBER,
    );

    const newSubscriptions = allUsers.map((user) => ({
      userId: user!.id,
      channelId: inviteUserDto.channelId,
      status: UserChannelSubscriptionStatus.INACTIVE,
      roleId: role?.id,
    }));

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

  async acceptInvitation(userId: UUID, channelId: UUID) {
    const invitations = await this.userChannelsRepository.find({
      where: { channelId },
    });
    if (!invitations) throw new Error('Invitation not found');

    const channel = await this.findOneById(channelId);
    const creator = channel?.createdBy;

    return invitations.map(async (invitation) => {
      if (invitation.userId === creator || invitation.userId === userId)
        await this.userChannelsRepository.update(invitation.id, {
          status: UserChannelSubscriptionStatus.ACTIVE,
        });
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

  async getMembers(channelId: UUID, withCreator?: boolean) {
    const userChannels = await this.userChannelsRepository.find({
      where: { channelId },
    });
    const channel = await this.findOneById(channelId);
    if (!channel) return;

    if (!withCreator) {
      return userChannels
        .filter((user) => user.userId !== channel.createdBy)
        .map((userChannel) => userChannel.userId);
    } else {
      return userChannels.map((userChannel) => userChannel.userId);
    }
  }
}
