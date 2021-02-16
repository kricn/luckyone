import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager  } from 'typeorm';

import { Article } from '../../../entity/article.entity'
import { Tags } from '../../../entity/tags.entity'

import { filterObject } from '../../../utils/common'

import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class WebArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    ) {}

    //获取文章列表
    async getArticleList(
        query?: any,
        offset?: number,
        limit?: number,
        sort?: number,
    ): Promise<Result> {
        const only = ['tags', 'keyword']
        let filterParams = {}
        only.forEach(key => {
            if (key === 'tags') {
                // console.log(query[key])
                filterParams[key] = query[key]?query[key].split(','):undefined
            } else if (key === 'keyword') {
                filterParams[key] = query[key] && `%${query[key]}%`
            } else {
                filterParams[key] = query[key]
            }
        })
        
        let queryLen = false
        let sql = ['article.type=1']
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
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .where(sqlString, filterParams)
            .orderBy({
                'article.id': sort?'ASC':'DESC'
            })
            .skip(offset || 0)
            .take(limit || 10)
            .getManyAndCount()

        const list = !res[0] ? [] :
            res[0].sort((a,b) => {
                if (!a.order) {
                    return 1
                } else if (!b.order || (!a.order && !b.order)) {
                    return -1
                }
                return Number(a.order) - Number(b.order)
            }).map(item => {
                return {
                    ...item,
                    access_cover_url: process.env.DOMAIN + item.cover,
                }
            })
        
        return {
            code: 0,
            message: 'success',
            data: {
                list: list,
                total: res[1]
            }
        }
    }

    //获取标签
    async getTags() {
        const res = await this.tagsRepository
            .createQueryBuilder('tags')
            .where('available=1')
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
    async getArticleDetail(id: number): Promise<Result> {

        let count = await this.articleRepository.count({id})
        if (count === 0) {
            throw new HttpException({
                message: '未找到对应文章'
            }, HttpStatus.NOT_FOUND)
        }
        let res = await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.tags', 'tags')
            .leftJoinAndSelect('article.comment', 'comment')
            .where('article.id=:id', {id})
            .getOne()
        return {
            code: 0,
            message: '获取成功',
            data: res
        }
    }
}
