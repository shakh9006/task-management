import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { CreateRoleInput, RoleOutput } from './dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  async createRole(data: CreateRoleInput): Promise<RoleOutput> {
    return await this.roleRepository.create({ ...data });
  }

  async findRoleByName(name: string): Promise<RoleOutput> {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async findAllRoles(): Promise<RoleOutput[]> {
    return await this.roleRepository.findAll();
  }
}
