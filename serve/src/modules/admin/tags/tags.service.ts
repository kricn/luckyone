import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager  } from 'typeorm';

import { Tags } from '../../../entity/tags.entity'

//interface
import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    ){}

    //获取标签列表
    async getTagsList(query):Promise<Result> {
        const { available } = query
        let sql = ''
        if (available) {
            sql = 'available=:available'
        }
        let res;
        try {
            res = await this.tagsRepository
                .createQueryBuilder()
                .where(sql, {available})
                .getManyAndCount()
        }catch(e) {
            return {
                code: -1,
                message: '查询失败'
            }
        }
        return {
            code: 0,
            message: '查询成功',
            data: {
                list: res[0],
                total: res[1]
            }
        }
    }

    //添加标签
    async addTags(name: string): Promise<Result> {
        try {
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Tags)
            .values({name: name})
            .execute()  
        } catch (e) {
            return {
                code: -1,
                message: '添加失败',
                data: e
            }
        }
        return {
            code: 0,
            message: '添加成功'
        }
    }

    //通过多个id查找多个标签
    async findTagsById(id: string): Promise<Result> {
        const ids = id && id.split(',').filter(i => Number(i)).map(i => Number(i))
        
        const sql = ids ? 't.id in (:...id)' : ''

        let res = []
        try {
            res = await this.tagsRepository
                    .createQueryBuilder('t')
                    .select('t')
                    .where(sql, { id: ids})
                    .getManyAndCount()
        } catch(e) {
            return {
                code: -1,
                message: '查询失败'
            }
        }
        return {
            code: 0,
            message: '查询成功',
            data: {
                list: res[0],
                total: res[1]
            }
        }
    }
    
    //通过一个id查找一个标签
    async findOneTagById(id: string) {
        
    }

    //删除标签
    async deleteTags(id: string): Promise<Result> {
        const ids = id && id.split(',').filter(i => Number(i)).map(i => Number(i))
        const sql = ids ? 'tags.id in (:...id)' : ''
        
        try {
            await this.tagsRepository
            .createQueryBuilder('tags')
            .delete()
            .where(sql, {id: ids})
            .execute()
        } catch (e) {
            return {
                code: -1,
                message: '删除失败',
                data: e
            }
        }
        return {
            code: 0,
            message: '删除成功'
        }
    }

    //禁用标签
    async banTags(id: string): Promise<Result> {
        const ids = id && id.split(',').filter(i => Number(i)).map(i => Number(i))
        const sql = ids ? 'tags.id in (:...id)' : ''

        try {
            await this.tagsRepository
            .createQueryBuilder('tags')
            .update()
            .set({available: 0})
            .where(sql, {id: ids})
            .execute()
        } catch (e) {
            return {
                code: -1,
                message: '禁用失败',
                data: e
            }
        }
        return {
            code: 0,
            message: '禁用成功'
        }
    }

}
