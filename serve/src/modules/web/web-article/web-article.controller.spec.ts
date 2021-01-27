import { Test, TestingModule } from '@nestjs/testing';
import { WebArticleController } from './web-article.controller';

describe('WebArticleController', () => {
  let controller: WebArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebArticleController],
    }).compile();

    controller = module.get<WebArticleController>(WebArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
