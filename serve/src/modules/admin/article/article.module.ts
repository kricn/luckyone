import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../../entity/article.entity'
import { Tags } from '../../../entity/tags.entity'
import { Comment } from '../../../entity/comment.entity'
import { User } from '../../../entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tags, Comment, User])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
