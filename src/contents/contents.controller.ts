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
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Controller('contents')
export class ContentsController {
  private logger = new Logger('ContentController');
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto): Promise<Content> {
    this.logger.verbose(`trying to create a content`);
    return this.contentsService.createContent(createContentDto);
  }

  @Get()
  getAllContents(): Promise<Content[]> {
    this.logger.verbose(`trying to get all contents`);
    return this.contentsService.getAllContents();
  }

  @Get(':id')
  getOneContent(@Param('id') contentId: number): Promise<Content> {
    this.logger.verbose(`trying to get a content by id ${contentId}`);
    return this.contentsService.getOneContent(contentId);
  }

  @Patch(':id')
  updateContent(
    @Param('id') contentId: number,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentsService.updateContent(contentId, updateContentDto);
  }

  @Delete(':id')
  removeContent(@Param('id') id: number) {
    return this.contentsService.removeContent(id);
  }
}
