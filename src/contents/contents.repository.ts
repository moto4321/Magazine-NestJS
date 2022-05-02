import { EntityRepository, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async createContent(
    user: User,
    filePath: string,
    createContentDto: CreateContentDto
  ): Promise<Content> {
    const { content } = createContentDto;
    const newContent = this.create({
      content,
      image_url: filePath,
      user,
    });

    await this.save(newContent);
    return newContent;
  }

  async updateContent(
    content_id: number,
    filePath: string,
    updateContentDto: UpdateContentDto
  ): Promise<Content> {
    const { content } = updateContentDto;
    return this.save({
      content_id,
      content,
      image_url: filePath,
    });
  }
}
