import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Priorities, Statuses } from '../../../common/types';

export class CreateTaskInput {
  @ApiProperty({ example: 'Some title', description: 'Task title' })
  @IsString({ message: 'Must be string' })
  title: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Task description',
  })
  @IsString({ message: 'Must be string' })
  description: string;

  @ApiProperty({ example: '1', description: 'Task assigned project id' })
  @IsNumber({}, { message: 'Must be integer' })
  projectId: number;

  @ApiProperty({ example: '1', description: 'Task assigned user id' })
  @IsNumber({}, { message: 'Must be integer' })
  assignId: number;

  @ApiProperty({
    example: 'new',
    description: 'Task status',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  status?: Statuses;

  @ApiProperty({
    example: 'new',
    description: 'Task status',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  priority?: Priorities;

  @ApiProperty({
    example: '2023-09-30T12:00:00Z',
    description: 'Task deadline date',
  })
  @IsString({ message: 'Must be date' })
  deadLine: Date;
}

export class TaskOutput extends CreateTaskInput {
  id: number;
}

export class UpdateTaskInput {
  @ApiProperty({ example: '1', description: 'Task id' })
  @IsNumber({}, { message: 'Must be integer' })
  id: number;

  @ApiProperty({ example: 'Some title', description: 'Task title' })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Task description',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '1', description: 'Task assigned project id' })
  @IsNumber({}, { message: 'Must be integer' })
  @IsOptional()
  projectId?: number;

  @ApiProperty({ example: '1', description: 'Task assigned user id' })
  @IsNumber({}, { message: 'Must be integer' })
  @IsOptional()
  assignId?: number;

  @ApiProperty({
    example: 'new',
    description: 'Task status',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  status?: Statuses;

  @ApiProperty({
    example: 'new',
    description: 'Task status',
  })
  @IsString({ message: 'Must be string' })
  @IsOptional()
  priority?: Priorities;

  @ApiProperty({
    example: '2023-09-30T12:00:00Z',
    description: 'Task deadline date',
  })
  @IsString({ message: 'Must be date' })
  @IsOptional()
  deadLine?: Date;
}
