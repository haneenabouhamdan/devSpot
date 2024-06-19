import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/message/create-message.dto';
import { UpdateMessageDto } from './dtos/message/update-message.dto';
import { MessageRepository } from './repositories';
import { MessageDto } from './dtos';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async update(
    id: UUID,
    updateMessageDto: UpdateMessageDto,
  ): Promise<MessageDto> {
    await this.messageRepository.update(id, updateMessageDto);
    return this.messageRepository.findOneBy({ id });
  }

  async getChannelMessages(channelId: UUID): Promise<Nullable<MessageDto[]>> {
    // TODO add date filter or limit or pagination
    return this.messageRepository.findBy({ channelId });
  }
}
