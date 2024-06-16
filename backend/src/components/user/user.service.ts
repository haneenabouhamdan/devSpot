import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserRepository } from './user.repository';
import { User } from './entities';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: UUID): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmailOrPhone(
    email: string,
    phoneNumber: string,
  ): Promise<Nullable<User>> {
    return this.userRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  async findOneByPhone(phoneNumber: string): Promise<Nullable<User>> {
    return this.userRepository.findOneBy({ phoneNumber });
  }

  async findOneByEmail(email: string): Promise<Nullable<User>> {
    return this.userRepository.findOneBy({ email });
  }

  async create(payload: CreateUserInput): Promise<User> {
    const user = await this.findOneByEmailOrPhone(
      payload.email ?? '',
      payload.phoneNumber ?? '',
    );

    if (user) {
      throw new BadGatewayException('user already exists');
    }

    const hashedPassword = await argon2.hash(payload.password);
    payload.password = hashedPassword;
    return this.userRepository.save(payload);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOneById(updateUserInput.id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (updateUserInput.password) {
      updateUserInput.password = await argon2.hash(updateUserInput.password);
    }

    this.userRepository.merge(user, updateUserInput);
    return this.userRepository.save(user);
  }

  async remove(id: UUID): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getById(id: UUID) {
    return this.userRepository.findOneById(id);
  }

  async updateById(id: UUID, dto: UpdateUserInput) {
    await this.userRepository.update(id, dto);
    return this.getById(id);
  }
}
