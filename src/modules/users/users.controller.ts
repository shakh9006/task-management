import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AddRoleInput, AddRoleOutput } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Set role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() data: AddRoleInput): Promise<AddRoleOutput> {
    return await this.userService.addRole(data);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<unknown> {
    return await this.userService.getUserById(id);
  }
}
