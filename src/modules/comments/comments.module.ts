import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../tasks/models/task.model';
import { Comment } from './models/comment.model';
import { User } from '../users/models/user.model';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CommentsService, TokenService, JwtService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([User, Task, Comment])],
})
export class CommentsModule {}
