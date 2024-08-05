import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from '../message';
import { CreateMessageDto } from '../message/dtos';
import { CreateNotificationDto } from '../notifications/dtos';
import { NotificationService } from '../notifications/notification.service';
import { NotificationStatus } from '../notifications/enums';
import { ChannelService } from '../channel';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly messageService: MessageService,
    private readonly notificationService: NotificationService,
    private readonly channelService: ChannelService,
  ) {}

  @SubscribeMessage('msgToServer')
  async handleMessage(
    client: Socket,
    payload: CreateMessageDto,
  ): Promise<void> {
    const message = await this.messageService.create(payload);
    this.server.emit('msgToClient', message);

    const users = await this.channelService.getMembers(payload.channelId);

    users.map(async (userId) => {
      const notificationPayload: CreateNotificationDto = {
        userId,
        messageId: message.id,
        title: 'New Message',
        text: `You have a new message`,
        channelId: payload.channelId,
        status: NotificationStatus.PENDING,
      };
      const notification =
        await this.notificationService.saveNotification(notificationPayload);
      this.server.emit('notification', notification);
    });
  }

  @SubscribeMessage('notify')
  async handleNotification(
    client: Socket,
    payload: CreateNotificationDto,
  ): Promise<void> {
    if (payload.channelId) {
      const users = await this.channelService.getMembers(
        payload.channelId as UUID,
      );
      users.map(async (userId) => {
        const notificationPayload: CreateNotificationDto = {
          userId,
          title: payload.title,
          text: payload.text,
          channelId: payload.channelId,
          status: NotificationStatus.PENDING,
        };
        const notification =
          await this.notificationService.saveNotification(notificationPayload);
        this.server.emit('notification', notification);
      });
    } else {
      const notification =
        await this.notificationService.saveNotification(payload);
      this.server.emit('notification', notification);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
