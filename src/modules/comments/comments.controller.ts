import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentOutput, CreateCommentInput, UpdateCommentInput } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() data: CreateCommentInput): Promise<unknown> {
    return await this.commentService.createComment(data);
  }

  @ApiOperation({ summary: 'Update Comment' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateComment(
    @Body() data: UpdateCommentInput,
  ): Promise<CommentOutput> {
    return await this.commentService.updateComment(data);
  }

  @ApiOperation({ summary: 'Update Comment' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteComment(@Param('id') id: number): Promise<unknown> {
    return await this.commentService.deleteComment(id);
  }
}
