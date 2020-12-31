import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeImage } from 'src/utils/common';
import { Repository, getConnection  } from 'typeorm';

import { Article } from '../../../entity/article.entity'
import { ArticleImg } from '../../../entity/article_img.entity'
import { Tags } from '../../../entity/tags.entity'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(ArticleImg) private readonly articleImgRepository: Repository<ArticleImg>,
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    ){}

    //添加文章
    async addArticle(body) {
        const { title, content, summary, cover, words, user, images, tags } = body
        let imagesPath = '/article'

        let tempImages = []
        images.forEach(async img => {
            tempImages.push(await writeImage(img, imagesPath))
        })
        let tempCover = await writeImage(cover, imagesPath)

        const article = new Article()
        article.title = title
        article.content = content
        article.summary = summary
        article.cover = tempCover
        article.words = words
        article.user = user.id

        await this.articleRepository.save(article)

        tempImages.forEach(async item => {
            let articleImgEntity = new ArticleImg()
            articleImgEntity.title = title
            articleImgEntity.url = item
            articleImgEntity.article = article
            await this.articleImgRepository.save(articleImgEntity)
        })

        tags.forEach(async item => {
            const tagsEntity = new Tags()
            tagsEntity.title = title
            tagsEntity.name = item
            tagsEntity.articles = [article]
            await this.tagsRepository.save(tagsEntity)
        })
        return {
            code: 0,
            msg: 'success'
        }
    }

    //获取文章列表
    async getArticleList(params) {
        return await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user', 'user.id = :id', {id: params.user.id})
            .leftJoinAndSelect('article.images', 'images')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .getMany()
    }

    //获取文章详情
    async getArticleDetail(params) {
        return await this.articleRepository
            .createQueryBuilder('article')
            // .leftJoinAndSelect('article.user', 'user')
            .leftJoinAndSelect('article.images', 'images')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            // .select(['article', 'images.id'])  //这样写是ok的
            // .where('article.id=:id', {id: params.id})
            .where('article.id=:id and article.user_id=:userId', {id: params.id, userId: params.user.id})
            .getOne() 
    }
}
