import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Content } from 'src/contents/entities/content.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne((type) => Content, (content) => content.comments, {
    onDelete: 'CASCADE',
  })
  content: Content;

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;
}
