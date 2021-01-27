import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager  } from 'typeorm';

import { Article } from '../../../entity/article.entity'

import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class WebArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    ) {}

    //获取文章列表
    async getArticleList(
        query?: any,
        offset?: number,
        limit?: number,
        sort?: number,
    ): Promise<Result> {
        // const only = ['keyword', 'id', 'tags', 'is_show', 'type']
        // let filterParams = {}
        // only.forEach(key => {
        //     if (key === 'tags') {
        //         filterParams[key] = query[key]?query[key].split(','):undefined
        //     } else if (key === 'keyword') {
        //         filterParams[key] = query[key] && `%${query[key]}%`
        //     } else {
        //         filterParams[key] = query[key]
        //     }
        // })
        
        // let queryLen = false
        // for (let key in query) {
        //     if (only.indexOf(key) >= 0 && query[key] && !queryLen) {
        //         queryLen = true
        //     }
        // }

        // let sql = !queryLen ? '' :
        //           `
        //             article.title like :keyword 
        //             or article.id=:id 
        //             or tags.id in (:...tags) 
        //             or is_show=:is_show
        //             or type=:type
        //           `

        const res = await this.articleRepository
            .createQueryBuilder('article')
            // .leftJoinAndSelect('article.tags', 'tags', 'tags.available=1')  //
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            // .where(sql, filterParams)
            // .andWhere('article.type <>0')  //获取处type为0之外的值也可以 article.type not in (1,2,3)
            .skip(offset || 0)
            .take(limit || 10)
            // .orderBy('article.order', sort?'ASC':'DESC')
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
}
