import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserToken } from './entities';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './user.resolver';
import {
  PermisionRepository,
  RoleRepository,
  UserTokenRepository,
} from './repositories';
// import { UserCache } from './cache';
import { UserChannelsRepository } from '../channel';
import { RoleFilter, UserFilter } from './filters';
import { RolesPermissionsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken])],
  providers: [
    UserService,
    UserResolver,
    UserRepository,
    RoleRepository,
    // UserCache,
    UserChannelsRepository,
    UserFilter,
    RoleFilter,
    RolesPermissionsService,
    PermisionRepository,
    UserTokenRepository,
  ],
  exports: [UserService, UserFilter, RolesPermissionsService],
})
export class UserModule {}
