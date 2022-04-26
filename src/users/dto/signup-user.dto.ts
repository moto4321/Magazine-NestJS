import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;
}
