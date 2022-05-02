import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContentsService } from './contents.service';
import { ContentRepository } from './contents.repository';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  find: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ContentsService', () => {
  let contentService: ContentsService;
  let contentRepository: MockRepository<Content>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        {
          provide: getRepositoryToken(Content),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    contentService = module.get<ContentsService>(ContentsService);
    contentRepository = module.get<MockRepository<Content>>(
      getRepositoryToken(Content)
    );
  });

  it('should be defined', () => {
    expect(contentService).toBeDefined();
    expect(contentRepository).toBeDefined();
  });

  // describe('getAll', () => {
  //   it('shoud return an array', async () => {
  //     const result = await contentService.getAllContents();
  //     console.log(result);
  //     expect(result).toBeInstanceOf(Array);
  //   });
  // });
});
