import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto): Promise<void> {
    return this.usersService.createUser(signupUserDto);
  }

  @Post('signin')
  login(
    @Body() signinUserDto: SigninUserDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.loginUser(signinUserDto);
  }
}
