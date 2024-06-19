import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GraphQLUUID } from 'graphql-scalars';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dtos';
import { Roles } from '../../common/decorators';
import { DefaultRoles } from './enums';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(DefaultRoles.ADMIN, DefaultRoles.SUPERADMIN)
  @Mutation(() => UserDto)
  createUser(@Args('CreateUserDto') CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @Query(() => [UserDto], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserDto, { name: 'user' })
  async findOne(
    @Args('id', { type: () => GraphQLUUID }) id: UUID,
  ): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  @Mutation(() => UserDto)
  async updateUser(
    @Args('UpdateUserDto') UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.update(UpdateUserDto);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  @Mutation(() => UserDto)
  removeUser(@Args('id') id: UUID) {
    return this.userService.remove(id);
  }
}
