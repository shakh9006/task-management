import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput, LoginInput, UserOutput } from '../users/dto';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/models/user.model';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly roleService: RolesService,
  ) {}
  async register(data: CreateUserInput): Promise<UserOutput> {
    console.log('data: ', data);
    const candidate = await this.userService.findUserByEmail(data.email);
    if (candidate)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const passwordHash = await bcrypt.hash(data.password, 5);
    const role = await this.roleService.findRoleByName('USER');
    const user = await this.userService.createUser({
      ...data,
      password: passwordHash,
    });

    if (role) {
      await user.$add('role', role.id);
    }

    return await this.getUserTokenData(user);
  }

  async login(data: LoginInput): Promise<UserOutput> {
    const user = await this.userService.findUserByEmail(data.email);
    const passwordCompare = await bcrypt.compare(data.password, user.password);

    if (!user || !passwordCompare) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
      });
    }

    return await this.getUserTokenData(user);
  }

  private async getUserTokenData(user: User): Promise<UserOutput> {
    const publicUser = await this.userService.getPublicUser(user.email);
    const data = {
      id: publicUser.id,
      email: publicUser.email,
      username: publicUser.username,
      roles: publicUser.roles,
    };
    const token = await this.tokenService.generateToken(data);

    return {
      ...data,
      token,
    };
  }
}
