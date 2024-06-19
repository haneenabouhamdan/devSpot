import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities';
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

  async create(payload: CreateUserDto): Promise<User> {
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

  async update(UpdateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(UpdateUserDto.id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (UpdateUserDto.password) {
      UpdateUserDto.password = await argon2.hash(UpdateUserDto.password);
    }

    this.userRepository.merge(user, UpdateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: UUID): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getById(id: UUID) {
    return this.userRepository.findOneBy({ id });
  }

  async updateById(id: UUID, dto: UpdateUserDto) {
    await this.userRepository.update(id, dto);
    return this.getById(id);
  }
}
