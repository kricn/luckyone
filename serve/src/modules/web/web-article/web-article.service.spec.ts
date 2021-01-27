import { Test, TestingModule } from '@nestjs/testing';
import { WebArticleService } from './web-article.service';

describe('WebArticleService', () => {
  let service: WebArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebArticleService],
    }).compile();

    service = module.get<WebArticleService>(WebArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
