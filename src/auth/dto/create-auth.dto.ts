import { IsNotEmpty } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateAuthDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
