import { IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  image_url: string;
}
