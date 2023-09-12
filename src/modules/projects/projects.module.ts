import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Project } from './model/project.model';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, TokenService, JwtService],
  imports: [SequelizeModule.forFeature([User, Project])],
})
export class ProjectsModule {}
