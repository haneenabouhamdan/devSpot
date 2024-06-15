import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
