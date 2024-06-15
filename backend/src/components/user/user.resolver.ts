import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { GraphQLUUID } from 'graphql-scalars';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dtos';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
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
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(updateUserInput);

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
