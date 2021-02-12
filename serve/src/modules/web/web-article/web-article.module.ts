import { Module } from '@nestjs/common';
import { WebArticleService } from './web-article.service';
import { WebArticleController } from './web-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Article } from '../../../entity/article.entity'
import { Tags } from '../../../entity/tags.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tags])],
  providers: [WebArticleService],
  controllers: [WebArticleController]
})
export class WebArticleModule {}
