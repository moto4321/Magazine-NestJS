import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
