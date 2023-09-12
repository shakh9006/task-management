import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from '../roles/models/roles.model';
import {
  AddRoleInput,
  AddRoleOutput,
  CreateUserInput,
  UserOutput,
} from './dto';
import { RolesService } from '../roles/roles.service';
import { where } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return await this.userRepository.create({ ...data });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findByPk(id);
  }

  async getPublicUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      include: { all: true },
    });
  }

  async addRole(data: AddRoleInput): Promise<AddRoleOutput> {
    const user = await this.userRepository.findByPk(data.userId);
    const role = await this.roleService.findRoleByName(data.value);
    if (role && user) {
      await user.$add('role', role.id);
      return data;
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number): Promise<unknown> {
    return await this.userRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
      include: { all: true },
    });
  }
}
