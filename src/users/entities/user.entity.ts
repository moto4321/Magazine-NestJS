import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Comment } from 'src/comments/entities/comment.entity';
import { Content } from 'src/contents/entities/content.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({
    default: 1,
  })
  role: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @OneToMany((type) => Comment, (comment) => comment.user, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany((type) => Content, (content) => content.user, {
    eager: true,
  })
  contents: Content[];
}
