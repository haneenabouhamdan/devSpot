import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { ChannelDto } from './dtos';
import { User, UserDto } from '../user';
import { Channel } from './entities';
import * as DataLoader from 'dataloader';
import { ChannelBatches } from './batches';
import { Roles } from 'src/common/decorators';
import { DefaultRoles } from '../user/enums';
import { GraphQLUUID } from 'graphql-scalars';
import { MessageDto } from '../message/dtos';
import { MessageService } from '../message';

@Resolver(() => ChannelDto)
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService,
    private channelBatches: ChannelBatches,
    private messageService: MessageService,
  ) {}

  @Roles(DefaultRoles.ADMIN, DefaultRoles.SUPERADMIN)
  @Mutation(() => ChannelDto)
  createChannel(@Args('CreateChannelDto') createChannelDto: CreateChannelDto) {
    const data = this.channelService.create(createChannelDto);
    return {
      message: 'Channel created sucessfully',
      data,
    };
  }

  @Query(() => [ChannelDto], { name: 'channels' })
  findAll() {
    return this.channelService.findAll();
  }

  @Query(() => ChannelDto, { name: 'channel' })
  findOne(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
    return this.channelService.findOneById(id);
  }

  @Query(() => [ChannelDto], { name: 'userChannels' })
  getUserCreatedChannels(@Args('id', { type: () => GraphQLUUID }) id: UUID) {
    return this.channelService.findByUserId(id);
  }

  // @Mutation(() => UserChannelDto, { name: 'SubscribeChannel' })
  // async subscribe(
  //   @Args('subscribeChannelDto') subscribeDto: SubscribeChannelDto,
  // ): Promise<UserChannelDto> {
  //   try {
  //     return this.channelService.subscribe(subscribeDto);
  //   } catch (error) {
  //     console.error('Error subscribing to channel:', error);
  //   }
  // }

  @ResolveField(() => [UserDto])
  async members(@Parent() channel: Channel): Promise<User[]> {
    const userLoader = new DataLoader<UUID, User[]>(async (channelIds) => {
      const membersMap = await this.channelBatches.members(
        channelIds as UUID[],
      );
      return channelIds.map((id) => membersMap.get(id) || []);
    });

    return userLoader.load(channel.id);
  }

  @ResolveField(() => [MessageDto])
  async messages(@Parent() channel: Channel): Promise<MessageDto[]> {
    const messagesMap = await this.messageService.getChannelsMessages([
      channel.id,
    ]);
    return messagesMap.get(channel.id) || [];
  }
}
