import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.createContent(createContentDto);
  }

  @Get()
  getAllContents(): Promise<Content[]> {
    return this.contentsService.getAllContents();
  }

  @Get(':id')
  getOneContent(@Param('id') contentId: number): Promise<Content> {
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
