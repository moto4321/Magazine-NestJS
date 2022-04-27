import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.contorller';
// import { typeORMConfig } from './configs/typeorm.config';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    // TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forRoot(),
    ContentsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
