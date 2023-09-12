import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumeric } from 'sequelize-typescript';

export class CreateProjectInput {
  @ApiProperty({ example: 'Some title', description: 'Project title' })
  @IsString({ message: 'Must be string' })
  title: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Project description',
  })
  @IsString({ message: 'Must be string' })
  description: string;

  @ApiProperty({ example: '1', description: 'Project creator id' })
  @IsOptional()
  authorId?: number;
}

export class ProjectOutput extends CreateProjectInput {
  id: number;
}

export class ProjectUpdateInput {
  @ApiProperty({ example: '1', description: 'Project id' })
  @IsNumber({}, { message: 'Must be integer' })
  id: number;

  @ApiProperty({ example: 'Some title', description: 'Project title' })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Project description',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  description?: string;
}
