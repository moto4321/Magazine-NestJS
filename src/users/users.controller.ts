import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto): Promise<void> {
    return this.usersService.createUser(signupUserDto);
  }

  @Post('signin')
  login(@Body() signinUserDto: SigninUserDto): Promise<{ token: string }> {
    return this.usersService.loginUser(signinUserDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
