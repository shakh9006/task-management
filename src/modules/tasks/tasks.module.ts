import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Project } from '../projects/model/project.model';
import { Task } from './models/task.model';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TasksService, TokenService, JwtService],
  controllers: [TasksController],
  imports: [SequelizeModule.forFeature([User, Project, Task])],
})
export class TasksModule {}
