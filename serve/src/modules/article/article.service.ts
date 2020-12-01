import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection  } from 'typeorm';

import { Article } from '../../entity/article.entity'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    ){}

    async addArticle(body, req) {
        const { title, content, summary, cover, words } = body
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Article)
            .values([
                {title, content, summary, cover, words, user: req.user.id}
            ])
            .execute()
    }
}
