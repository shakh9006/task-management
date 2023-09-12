import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserInput, LoginInput, UserOutput } from '../users/dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 201, type: UserOutput })
  @Post('register')
  async register(@Body() data: CreateUserInput): Promise<UserOutput> {
    return await this.authService.register(data);
  }

  @ApiOperation({ summary: 'Login via user data' })
  @ApiResponse({ status: 200, type: UserOutput })
  @Post('login')
  async login(@Body() data: LoginInput): Promise<UserOutput> {
    return await this.authService.login(data);
  }
}
