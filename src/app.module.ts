import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.contorller';
import { typeORMConfig } from '../ormconfig';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    ContentsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
