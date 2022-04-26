import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentRepository } from './contents.repository';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}

  createContent(createContentDto: CreateContentDto) {
    return this.contentRepository.createContent(createContentDto);
  }

  async getAllContents(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async getOneContent(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne(id);
    if (!content) {
      throw new NotFoundException(`content id ${id} not found`);
    }
    return content;
  }

  async updateContent(
    id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const content = await this.getOneContent(id);
    if (content) {
      // await this.contentRepository.update(id, updateContentDto);
      return this.contentRepository.updateContent(id, updateContentDto);
    }
  }

  async removeContent(id: number): Promise<void> {
    const result = await this.contentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${id}`);
    }
  }
}
