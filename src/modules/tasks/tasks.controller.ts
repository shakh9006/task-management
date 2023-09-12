import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskInput, TaskOutput, UpdateTaskInput } from './dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create Task' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Body() data: CreateTaskInput,
    @Req() req,
  ): Promise<TaskOutput> {
    return await this.tasksService.createTask(data);
  }

  @ApiOperation({ summary: 'Update Task' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateTask(@Body() data: UpdateTaskInput): Promise<TaskOutput> {
    return await this.tasksService.updateTask(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Single Task' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async getTask(@Param('id') id: number): Promise<TaskOutput> {
    return await this.tasksService.getTask(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get Single Task' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async getTasks(): Promise<TaskOutput[]> {
    return await this.tasksService.getTasks();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Task' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: number): Promise<unknown> {
    return await this.tasksService.deleteTask(id);
  }
}
