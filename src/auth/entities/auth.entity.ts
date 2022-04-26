import { IsEmail } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;
}
