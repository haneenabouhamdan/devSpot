import { Module, forwardRef } from '@nestjs/common';

import { MessageModule } from '../message/message.module';
import { NotificationModule } from '../notifications/notification.module';
import { AppGateway } from './App.gateway';
import { MessageRepository, MessageService } from '../message';
import { NotificationService } from '../notifications/notification.service';
import { UserRepository, UserService } from '../user';
import { NotificationRepository } from '../notifications/notification.repository';
import {
  PermisionRepository,
  RoleRepository,
  UserTokenRepository,
} from '../user/repositories';
import { RoleFilter, UserFilter } from '../user/filters';
import {
  ChannelRepository,
  ChannelService,
  UserChannelsRepository,
} from '../channel';
import { RolesPermissionsService } from '../user/services';

@Module({
  imports: [
    forwardRef(() => MessageModule),
    forwardRef(() => NotificationModule),
  ],
  providers: [
    AppGateway,
    MessageService,
    NotificationService,
    MessageRepository,
    UserService,
    NotificationRepository,
    UserRepository,
    UserTokenRepository,
    UserFilter,
    ChannelService,
    ChannelRepository,
    UserChannelsRepository,
    RolesPermissionsService,
    RoleRepository,
    PermisionRepository,
    RoleFilter,
  ],
  exports: [AppGateway],
})
export class GatewayModule {}
