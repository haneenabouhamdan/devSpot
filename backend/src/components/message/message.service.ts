import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/message/create-message.dto';
import { UpdateMessageDto } from './dtos/message/update-message.dto';
import { MessageRepository } from './repositories';
import { MessageDto } from './dtos';
import { FilterArgs } from 'src/common/dtos';
import { WithRelation } from 'src/common/types';
import { In } from 'typeorm';
import { Message } from './entities';
import { MessageStatus } from './enums';
import { UserService } from '../user';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private userService: UserService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async update(
    id: UUID,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageDto> {
    await this.messageRepository.update(id, updateMessageDto);
    return this.messageRepository.save({ ...updateMessageDto, id });
  }

  async getChannelsMessages(
    channelIds: UUID[],
    filters?: FilterArgs,
  ): Promise<Map<UUID, MessageDto[]>> {
    const messageChannels = (await this.messageRepository.find({
      where: {
        channelId: In(channelIds),
      },
      take: filters?.limit || 100,
      relations: ['messageReactions'],
    })) as unknown as WithRelation<Message, 'messageReactions'>[];

    const messagesByChannelId = new Map<UUID, MessageDto[]>();

    for (const message of messageChannels) {
      const user = await this.userService.getById(message.senderId);
      const messageDto: MessageDto = {
        ...message,
        ...(user && { sender: user }),
      };

      if (!messagesByChannelId.has(message.channelId)) {
        messagesByChannelId.set(message.channelId, []);
      }
      messagesByChannelId.get(message.channelId)?.push(messageDto);
    }

    return messagesByChannelId;
  }
}
