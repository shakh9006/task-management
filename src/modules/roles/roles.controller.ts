import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleInput, RoleOutput } from './dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 201, type: RoleOutput })
  @Post()
  create(@Body() data: CreateRoleInput) {
    return this.roleService.createRole(data);
  }

  @ApiOperation({ summary: 'Get Role by name' })
  @ApiResponse({ status: 200, type: RoleOutput })
  @Get('/:value')
  getRoleByName(@Param('value') value: string) {
    return this.roleService.findRoleByName(value);
  }
}
