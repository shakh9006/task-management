import { Injectable } from '@nestjs/common';
import { CommentOutput, CreateCommentInput, UpdateCommentInput } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private readonly commentRepository: typeof Comment,
  ) {}

  async createComment(data: CreateCommentInput): Promise<Comment> {
    return await this.commentRepository.create({ ...data });
  }

  async updateComment(data: UpdateCommentInput): Promise<CommentOutput> {
    const comment = await this.commentRepository.findByPk(data.id);
    const commentData = {
      text: data.text || comment.text,
    };

    await this.commentRepository.update(commentData, {
      where: { id: data.id },
    });

    return {
      id: data.id,
      ...commentData,
      authorId: comment.authorId,
      taskId: comment.taskId,
    };
  }

  async deleteComment(id: number): Promise<unknown> {
    await this.commentRepository.destroy({ where: { id } });
    return { deleted: true };
  }
}
