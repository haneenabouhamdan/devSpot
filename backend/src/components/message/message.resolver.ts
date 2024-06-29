import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/message/create-message.dto';
import { UpdateMessageDto } from './dtos/message/update-message.dto';
import {
  MessageDto,
  PinMessageDto,
  CreateMessageReactionDto,
  MessageReactionDto,
  CreatePinMessageDto,
} from './dtos';
import {
  MessageReactionRepository,
  PinnedMessageRepository,
} from './repositories';
import { GraphQLUUID } from 'graphql-scalars';
import { GeneralResponseDto } from 'src/common/dtos';

@Resolver(() => MessageDto)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageReactionRepository: MessageReactionRepository,
    private readonly pinnedMessageRepository: PinnedMessageRepository,
  ) {}

  @Mutation(() => MessageDto)
  createMessage(@Args('CreateMessageDto') CreateMessageDto: CreateMessageDto) {
    return this.messageService.create(CreateMessageDto);
  }

  @Mutation(() => MessageDto)
  updateMessage(@Args('UpdateMessageDto') UpdateMessageDto: UpdateMessageDto) {
    return this.messageService.update(UpdateMessageDto.id, UpdateMessageDto);
  }

  @Mutation(() => MessageReactionDto)
  async createMessageReaction(
    @Args('createMessageReactionDto')
    createMessageReactionDto: CreateMessageReactionDto,
  ): Promise<MessageReactionDto> {
    const newReaction = this.messageReactionRepository.create(
      createMessageReactionDto,
    );
    return this.messageReactionRepository.save(newReaction);
  }

  @Query(() => [MessageDto], { name: 'channelMessages' })
  getChannelMessages(
    @Args('channelId', { type: () => GraphQLUUID }) channelId: UUID,
  ) {
    return this.messageService.getChannelMessages(channelId);
  }

  @Mutation(() => PinMessageDto)
  pinMessage(
    @Args('pinMessage', { type: () => CreatePinMessageDto })
    pinMessage: CreatePinMessageDto,
  ) {
    return this.pinnedMessageRepository.save(pinMessage);
  }

  @Mutation(() => GeneralResponseDto)
  unpinMessage(
    @Args('unpinMessage', { type: () => GraphQLUUID })
    id: UUID,
  ) {
    return this.pinnedMessageRepository.delete(id);
  }
}
