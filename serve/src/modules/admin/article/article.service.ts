import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeImage } from 'src/utils/common';
import { Repository, getConnection, getManager  } from 'typeorm';

//entity
import { Article } from '../../../entity/article.entity'
import { Tags } from '../../../entity/tags.entity'

//dto
import { ArticleAddDTO } from './dto/article.add.dto'

//interface
import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    ){}

    //添加文章
    async addArticle(body: ArticleAddDTO, user): Promise<Result> {
        const { 
            title, 
            content, 
            summary, 
            cover, 
            // words, 
            tags,
            status,
            order,
            type,
        } = body
        let imagesPath = '/article'

        let tempCover = await writeImage(cover, imagesPath)

        const article = new Article()
        article.title = title
        article.content = content
        article.summary = summary
        article.cover = tempCover
        article.user = user.id
        type ? article.type = type : ''
        // words ? article.words = words : ''
        status ? article.status = status : ''
        order ? article.order = order : ''
        
        article.tags = await this.tagsRepository
                                 .createQueryBuilder('i')
                                 .where('i.id in (:...id)', {id: tags})
                                 .getMany()
        

        try {
          await this.articleRepository.save(article)  
        } catch {
            return {
                code: -1,
                message: '创建文章失败！'
            }
        }

        return {
            code: 0,
            message: 'success'
        }
    }

    //修改文章
    async editArticle(body: ArticleAddDTO, id: number, user): Promise<Result> {
        await this.interceptIllegalUser(id, user)
        let { title, content, summary, cover, tags, status, order } = body
        if (tags.length < 1) {
            tags = undefined
        }
        let imagesPath = '/article'

        let tempCover = cover
        
        if (!tempCover.match(imagesPath)) {
            tempCover = await writeImage(cover, imagesPath)   
        }

        try {
            const articleBuilder = await this.articleRepository
                    .createQueryBuilder('article')
                    .leftJoinAndSelect('article.user', 'user')
                    .where('article.id=:id and user.id=:user_id', {id, user_id: user.id})
            let article = await articleBuilder.getOne()
            ;(await article).tags = await this.tagsRepository
                                     .createQueryBuilder('i')
                                     .where('i.id in (:...id)', {id: tags})
                                     .getMany()
            await this.articleRepository.save(article)
            await articleBuilder.update(Article).set({title, content, summary, cover: tempCover, status, order: order || null}).execute()
        } catch(e) {
            console.log(e)
            return {
                code: -1,
                message: '修改文章失败！'
            }
        }

        return {
            code: 0,
            message: 'tags 未更新'
        }
    }


    //切换文章显示隐藏
    async switchArticleList(id: number, status: number, user): Promise<Result> {
        await this.interceptIllegalUser(id, user)
        if (status > 0) {
            status = 1
        } else {
            status = 0
        }

        await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
            .update()
            .set({status})
            .where('article.id=:id and user.id=:user_id', {id: id, user_id: user.id})
            .execute()

        return {
            code: 0,
            message: status === 1 ? 'showed' : 'hidden'
        }
    }

    //删除文章
    async deleteArticle(id: number, user): Promise<Result> {
        await this.interceptIllegalUser(id, user)
        await this.articleRepository
        .createQueryBuilder('article')
        .delete()
        .where('article.id=:id and user.id=user_id', {id, user_id: user.id})
        .execute()

        return {
            code: 0,
            message: 'delete successful'
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
        const only = ['keyword', 'id', 'tags', 'status', 'type']
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
        
        let queryLen = false
        let sql = []
        for (let key in query) {
            if (only.indexOf(key) >= 0 && query[key] && !queryLen) {
                if (key === 'tags') {
                    sql.push('tags.id in (:...tags) ')
                } else if (key === 'keyword') {
                    sql.push('article.title like :keyword ')
                } else {
                    sql.push(`article.${key}=:${key}`)
                }
            }
        }

        let sqlString = sql.join(' and ')

        const res = await this.articleRepository
            .createQueryBuilder('article')
            // .leftJoinAndSelect('article.tags', 'tags', 'tags.available=1')  //
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .where(sqlString, filterParams)
            .andWhere('article.user_id=:id', {id: user.id})
            // .andWhere('article.type <>0')  //获取处type为0之外的值也可以 article.type not in (1,2,3)
            .skip(offset || 0)
            .take(limit || 10)
            // .getSql()
            .getManyAndCount()
        return {
            code: 0,
            message: 'success',
            data: {
                list: res[0],
                total: res[1]
            }
        }
    }

    //获取文章详情
    async getArticleDetail(id: number, user): Promise<Result> {
        await this.interceptIllegalUser(id, user)
        const res = await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            // .select(['article', 'images.id'])  //这样写是ok的
            // .where('article.id=:id', {id: params.id})
            .where('article.id=:id and user.id=:user_id', {id, user_id: user.id})
            .getOne() 
        return {
            code: 0,
            message: 'success',
            data: res
        }
    }

    //拦截非法用户
    async interceptIllegalUser(id, user):Promise<Boolean> {
        let article = await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.user', 'user')
        let matchArticleCount = await article
            .where(
                'article.id=:id and user.id=:user_id', 
                {id, user_id: user.id}
            )
            .getCount()
        if (matchArticleCount === 0) {
            throw new HttpException({
                message: '未找到对应文章'
            }, HttpStatus.NOT_FOUND)
        }
        return true
    }
}
