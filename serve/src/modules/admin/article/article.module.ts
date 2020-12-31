import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../../entity/article.entity'
import { ArticleImg } from '../../../entity/article_img.entity'
import { Tags } from '../../../entity/tags.entity'
import { Comment } from '../../../entity/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleImg, Tags, Comment])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
