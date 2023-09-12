import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './model/project.model';
import { CreateProjectInput, ProjectOutput, ProjectUpdateInput } from './dto';
import { Task } from '../tasks/models/task.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private readonly projectRepository: typeof Project,
  ) {}

  async createProject(data: CreateProjectInput): Promise<ProjectOutput> {
    return await this.projectRepository.create({ ...data });
  }

  async updateProject(data: ProjectUpdateInput): Promise<ProjectOutput> {
    const project = await this.projectRepository.findByPk(data.id);
    const updateData = {
      title: data.title || project.title,
      description: data.description || project.description,
    };

    await this.projectRepository.update(updateData, {
      where: { id: data.id },
    });

    return { id: project.id, authorId: project.authorId, ...updateData };
  }

  async getProject(id: number): Promise<ProjectOutput> {
    return await this.projectRepository.findByPk(id, {
      include: { model: Task, required: false },
    });
  }

  async getProjects(): Promise<ProjectOutput[]> {
    return await this.projectRepository.findAll({
      include: { model: Task, required: false },
    });
  }

  async deleteProject(id: number): Promise<unknown> {
    await this.projectRepository.destroy({ where: { id } });
    return { deleted: true };
  }
}
