import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleInput {
  @ApiProperty({ example: 'USER', description: 'Role name' })
  @IsString({ message: 'Must be string' })
  name: string;
}

export class RoleOutput extends CreateRoleInput {
  @ApiProperty({ example: '1', description: 'Role id' })
  id: number;
}
