import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'content_id' })
  id: number;

  @Column()
  content: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany((type) => Comment, (comment) => comment.content, {
    eager: true,
  })
  @JoinColumn({ name: 'id' })
  comments: Comment[];

  @ManyToOne((type) => User, (user) => user.contents, {
    eager: false,
  })
  user: User;
}
