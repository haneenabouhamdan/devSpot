import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { CreateChannelInput } from './dto/create-channel.input';
import { ChannelDto } from './dto';

@Resolver(() => ChannelDto)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => ChannelDto)
  createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    return this.channelService.create(createChannelInput);
  }

  @Query(() => [ChannelDto], { name: 'channel' })
  findAll() {
    return this.channelService.findAll();
  }

  @Query(() => ChannelDto, { name: 'channel' })
  findOne(@Args('id') id: UUID) {
    return this.channelService.findOneById(id);
  }

  @Query(() => ChannelDto, { name: 'channel' })
  getUserChannels(@Args('userId') userId: UUID) {
    return this.channelService.findByUserId(userId);
  }
}
