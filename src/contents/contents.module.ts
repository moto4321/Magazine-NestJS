import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './contents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
