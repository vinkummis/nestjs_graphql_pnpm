import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput, UserInput } from './inputs/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: UserInput): Promise<User> {
    const userData = this.userRepository.create(user);
    return this.userRepository.save(userData);
  }

  async update(id: number, user: UpdateUserInput): Promise<User> {
    const userData = await this.findOne(id);
    Object.assign(userData, user);
    await this.userRepository.save(userData);
    return userData;
  }

  async remove(id: number): Promise<void> {
    const userData = await this.findOne(id);
    await this.userRepository.remove(userData);
  }
}
