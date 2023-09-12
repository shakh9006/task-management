import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentInput {
  @ApiProperty({
    example: 'This is awesome comment',
    description: 'Comment text',
  })
  @IsString({ message: 'Must be string' })
  text: string;

  @ApiProperty({
    example: '1',
    description: 'Commented user id',
  })
  @IsNumber({}, { message: 'Must be integer' })
  authorId: number;

  @ApiProperty({
    example: '1',
    description: 'Task id',
  })
  @IsNumber({}, { message: 'Must be integer' })
  taskId: number;
}

export class UpdateCommentInput {
  @ApiProperty({
    example: 'This is awesome comment',
    description: 'Comment text',
  })
  @IsNumber({}, { message: 'Must be integer' })
  id: number;

  @ApiProperty({
    example: 'This is awesome comment',
    description: 'Comment text',
  })
  @IsString({ message: 'Must be string' })
  text: string;
}

export class CommentOutput extends CreateCommentInput {
  id: number;
}
