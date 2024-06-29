import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './user.resolver';
import { RoleRepository } from './repositories';
// import { UserCache } from './cache';
import { UserChannelsRepository } from '../channel';
import { RoleFilter, UserFilter } from './filters';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserResolver,
    UserRepository,
    RoleRepository,
    // UserCache,
    UserChannelsRepository,
    UserFilter,
    RoleFilter,
  ],
  exports: [UserService, UserFilter],
})
export class UserModule {}
