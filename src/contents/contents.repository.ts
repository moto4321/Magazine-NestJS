import { EntityRepository, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const { content, image_url } = createContentDto;

    const newContent = this.create({
      content,
      image_url,
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
