import { EntityRepository, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async createContent(
    filePath: string,
    createContentDto: CreateContentDto,
  ): Promise<Content> {
    const { content } = createContentDto;

    const newContent = this.create({
      content,
      image_url: filePath,
    });

    await this.save(newContent);
    return newContent;
  }

  async updateContent(
    content_id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const { content, image_url } = updateContentDto;
    return this.save({
      content_id,
      content,
      image_url,
    });
  }
}
