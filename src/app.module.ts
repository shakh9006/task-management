import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { User } from './modules/users/models/user.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/models/roles.model';
import { UserRoles } from './modules/roles/models/user-roles.model';
import { Project } from './modules/projects/model/project.model';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './modules/tasks/models/task.model';
import { CommentsModule } from './modules/comments/comments.module';
import { Comment } from './modules/comments/models/comment.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Role, UserRoles, Project, Task, Comment],
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
})
export class AppModule {}
