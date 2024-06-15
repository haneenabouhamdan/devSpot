import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post()
  async create(@Body() user: CreateUserInput): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: UUID,
    @Body() user: UpdateUserInput,
  ): Promise<void> {
    await this.userService.updateById(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID): Promise<void> {
    return this.userService.remove(id);
  }
}
