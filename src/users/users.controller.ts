import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
  Response,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.usersService.googleLogin(req);
  }

  @Post('signup')
  create(@Body() signupUserDto: SignupUserDto): Promise<void> {
    return this.usersService.createUser(signupUserDto);
  }

  @Post('signin')
  async login(@Body() signinUserDto: SigninUserDto): Promise<object> {
    const token = await this.usersService.loginUser(signinUserDto);
    return {
      ok: true,
      ...token,
    };
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
