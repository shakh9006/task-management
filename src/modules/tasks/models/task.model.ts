import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Comment } from '../../comments/models/comment.model';
import { Project } from '../../projects/model/project.model';
import { Priorities, Statuses } from '../../../common/types';

@Table({ tableName: 'tasks' })
export class Task extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({
    type: DataType.ENUM('new', 'in_progress', 'done'),
    allowNull: false,
    defaultValue: 'new',
  })
  status: Statuses;

  @Column({
    type: DataType.ENUM('normal', 'urgent', 'critical'),
    allowNull: false,
    defaultValue: 'normal',
  })
  priority: Priorities;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project, 'projectId')
  project: Project;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  assignId: number;

  @BelongsTo(() => User, 'assignId')
  assignee: User;

  @Column({ type: DataType.DATE })
  deadLine: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  createdAt: Date;

  @HasMany(() => Comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];
}
