import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Task } from '../../tasks/models/task.model';
import { User } from '../../users/models/user.model';
import { Project } from '../../projects/model/project.model';

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @Column({ type: DataType.STRING })
  text: string;

  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @BelongsTo(() => Task)
  task: Task;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;
}
