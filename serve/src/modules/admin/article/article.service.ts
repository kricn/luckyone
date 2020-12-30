import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection  } from 'typeorm';

import { Article } from '../../../entity/article.entity'

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

    async getArticleList(params) {
        console.log(params)
        return await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user', 'user.id = :id', {id: params.user.id})
            .leftJoinAndSelect('article.images', 'images')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .getMany()
    }
}
