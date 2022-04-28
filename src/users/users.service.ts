import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  findOne: any;
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(signupUserDto: SignupUserDto) {
    const isExist = await this.userRepository.findOne({
      email: signupUserDto.email,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: ['이미 등록된 사용자입니다.'],
        error: 'Forbidden',
      });
    }
    try {
      // await this.userRepository.save(signupUserDto);
      await this.userRepository.save(User.create(signupUserDto));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ...error,
      };
    }
  }

  async loginUser(signinUserDto: SigninUserDto): Promise<{ token: string }> {
    const { email, password } = signinUserDto;
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'nickname', 'password'],
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('login failed');
    } else if (user && (await bcrypt.compare(password, user.password))) {
      const { id, nickname } = user;
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { id, email, nickname };
      const token = await this.jwtService.sign(payload);

      return { token };
    }
  }
}
