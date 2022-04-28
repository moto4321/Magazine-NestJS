import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Logger,
  UseInterceptors,
  Bind,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { customFileIntercept } from 'src/lib/fileInterceptor';

@Controller('contents')
export class ContentsController {
  private logger = new Logger('ContentController');
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(
    customFileIntercept({
      fieldname: 'file',
      dest: './uploads',
      maxFileSize: 2000000,
      fileCount: 1,
      allowFileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    createContentDto: CreateContentDto,
  ): Promise<Content> {
    this.logger.verbose(`trying to create a content`);
    try {
      return this.contentsService.createContent(file, createContentDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  getAllContents(): Promise<Content[]> {
    this.logger.verbose(`trying to get all contents`);
    return this.contentsService.getAllContents();
  }

  @Get(':content_id')
  getOneContent(@Param('content_id') content_id: number): Promise<Content> {
    this.logger.verbose(`trying to get a content by id ${content_id}`);
    return this.contentsService.getOneContent(content_id);
  }

  @Patch(':content_id')
  updateContent(
    @Param('content_id') content_id: number,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentsService.updateContent(content_id, updateContentDto);
  }

  @Delete(':content_id')
  removeContent(@Param('content_id') content_id: number) {
    return this.contentsService.removeContent(content_id);
  }
}
