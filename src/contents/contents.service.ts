import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentRepository } from './contents.repository';
import { Content } from './entities/content.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository
  ) {}

  createContent(
    user: User,
    file: object,
    createContentDto: CreateContentDto
  ): Promise<Content> {
    try {
      const filePath = file['path'];
      return this.contentRepository.createContent(
        user,
        filePath,
        createContentDto
      );
    } catch (error) {
      return error;
    }
  }

  async getAllContents(): Promise<Content[]> {
    try {
      return this.contentRepository.find();
    } catch (error) {
      return error;
    }
  }

  async getOneContent(content_id: number): Promise<Content> {
    const content = await this.contentRepository.findOne(content_id);
    if (!content) {
      throw new NotFoundException(`content id ${content_id} not found`);
    }
    return content;
  }

  async updateContent(
    content_id: number,
    file: object,
    updateContentDto: UpdateContentDto
  ): Promise<Content> {
    const content = await this.getOneContent(content_id);
    const filePath = file['path'];
    if (content) {
      // await this.contentRepository.update(id, updateContentDto);
      return this.contentRepository.updateContent(
        content_id,
        filePath,
        updateContentDto
      );
    }
  }

  async removeContent(content_id: number): Promise<void> {
    const result = await this.contentRepository.delete(content_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Content with id ${content_id}`);
    }
  }
}
