import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection  } from 'typeorm';

import { Article } from '../../entity/article.entity'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly userRepository: Repository<Article>,
    ){}

    async addArticle(body) {
        const { title, content, summary, cover, words } = body
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Article)
            .values([
                {title, content, summary, cover, words}
            ])
            .execute()
    }
}
