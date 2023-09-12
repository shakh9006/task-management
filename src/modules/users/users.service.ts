import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async createUser() {
    const data = {
      email: 'test@test.com',
      username: 'test',
      password: 'qwe123321',
      role: 'admin',
    };

    return await this.userRepository.create(data);
  }
}
