import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.contorller';
import { typeORMConfig } from './configs/typeorm.config';
import { ContentsModule } from './contents/contents.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ContentsModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
