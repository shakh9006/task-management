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
import { CreateProjectInput, ProjectOutput, ProjectUpdateInput } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @ApiOperation({ summary: 'Create Project' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Body() data: CreateProjectInput,
    @Req() req,
  ): Promise<ProjectOutput> {
    const user = req.user;
    data.authorId = parseInt(user.id);
    return await this.projectService.createProject(data);
  }

  @ApiOperation({ summary: 'Update Project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProject(
    @Body() data: ProjectUpdateInput,
  ): Promise<ProjectOutput> {
    return await this.projectService.updateProject(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Single Project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async getProject(@Param('id') id: number): Promise<ProjectOutput> {
    return await this.projectService.getProject(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get Projects List' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async getProjects(): Promise<ProjectOutput[]> {
    return await this.projectService.getProjects();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Project' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  async deleteProject(@Param('id') id: number): Promise<unknown> {
    return await this.projectService.deleteProject(id);
  }
}
