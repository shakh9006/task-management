import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { CreateTaskInput, TaskOutput, UpdateTaskInput } from './dto';
import { Comment } from '../comments/models/comment.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}

  async createTask(data: CreateTaskInput): Promise<TaskOutput> {
    return await this.taskRepository.create({ ...data });
  }

  async updateTask(data: UpdateTaskInput): Promise<TaskOutput> {
    const task = await this.taskRepository.findByPk(data.id);
    const updateData = {
      title: data.title || task.title,
      description: data.description || task.description,
      status: data.status || task.status,
      priority: data.priority || task.priority,
      deadLine: data.deadLine || task.deadLine,
      assignId: data.assignId || task.assignId,
      projectId: data.projectId || task.projectId,
    };

    await this.taskRepository.update(updateData, {
      where: { id: data.id },
    });

    return { id: task.id, ...updateData };
  }

  async getTask(id: number): Promise<TaskOutput> {
    return await this.taskRepository.findByPk(id, {
      include: { model: Comment, required: true },
    });
  }

  async getTasks(): Promise<TaskOutput[]> {
    return await this.taskRepository.findAll({
      include: { model: Comment, required: true },
    });
  }

  async deleteTask(id: number): Promise<unknown> {
    await this.taskRepository.destroy({ where: { id } });
    return { deleted: true };
  }
}
