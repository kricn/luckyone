import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeImage } from 'src/utils/common';
import { Repository, getConnection  } from 'typeorm';

//entity
import { Article } from '../../../entity/article.entity'
import { ArticleImg } from '../../../entity/article_img.entity'
import { Tags } from '../../../entity/tags.entity'

//dto
import { ArticleAddDTO } from './dto/article.add.dto'

//interface
import { Result } from '../../../common/interface/result.interface'
import { ArticleGetDTO } from './dto/article.get.dto';
import { on } from 'process';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(ArticleImg) private readonly articleImgRepository: Repository<ArticleImg>,
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    ){}

    //添加文章
    async addArticle(body: ArticleAddDTO): Promise<Result> {
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

        try {
          await this.articleRepository.save(article)  
        } catch {
            return {
                code: -1,
                msg: '创建文章失败！'
            }
        }
        try {
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
        } catch {
            return {
                code: -1,
                msg: '图片或标签写入失败！'
            }
        }
        return {
            code: 0,
            msg: 'success'
        }
    }

    //获取文章列表
    async getArticleList(
        user: any,
        query?: any,
        offset?: number,
        limit?: number,
        sort?: number,
    ): Promise<Result> {
        const only = ['keyword', 'id', 'tags']
        let filterParams = {}
        only.forEach(key => {
            if (key === 'tags') {
                filterParams[key] = query[key]?query[key].split(','):undefined
            } else if (key === 'keyword') {
                filterParams[key] = query[key] && `%${query[key]}%`
            } else {
                filterParams[key] = query[key]
            }
        })
        
        let queryLen = 0
        for (let key in query) {
            console.log()
            if (only.indexOf(key) >= 0 ) {
                queryLen += 1
            }
        }

        let sql = queryLen <= 0 ? '' :
                  `article.title like :keyword or article.id=:id or tags.id in (:...tags)`
        console.log(sql)
        const res = await this.articleRepository
            .createQueryBuilder('article')
            .leftJoin('article.user', 'user', 'user.id = :id', {id: user.id})
            .leftJoinAndSelect('article.images', 'images')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .where(sql, filterParams)
            .skip(offset || 0)
            .take(limit || 10)
            .orderBy('article.created_date', !sort?'ASC':'DESC')
            // .getSql()
            .getManyAndCount()
        return {
            code: 0,
            msg: 'success',
            data: res
        }
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
