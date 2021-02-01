import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager  } from 'typeorm';

import { Tags } from '../../../entity/tags.entity'
import { User } from '../../../entity/user.entity'

//interface
import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    //获取标签列表
    async getTagsList(query, user):Promise<Result> {
        let sqlArr = []
        for (let key in query) {
            if (key === 'keyword' && query[key]) {
                sqlArr.push('name like :keyword')
                query[key] = `%${query[key]}%`
            } else if (key === 'available' && query[key] !== '') {
                sqlArr.push('available=:available')
            }
        }
        let sql = sqlArr.join(' and ')
        let res;
        try {
            res = await this.tagsRepository
                .createQueryBuilder()
                .where(sql, query)
                .andWhere('user_id=:id', {id: user.id})
                .getManyAndCount()
        }catch(e) {
            throw new HttpException({
                message: '查询失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
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
    async addTags(name: string, user): Promise<Result> {
        try {
            let tags = new Tags()
            tags.name = name
            tags.user = user.id
            this.tagsRepository.save(tags)
        } catch (e) {
            throw new HttpException({
                message: '添加失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
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
            throw new HttpException({
                message: '查询失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
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
    
    // 修改标签
    async updatetag(id: number, name: string, user): Promise<Result> {
        await this.interceptIllegalUser(id, user)
        let tag = await this.tagsRepository.count({id})
        if (!tag) {
            throw new HttpException({
                message: '未知标签'
            }, HttpStatus.SERVICE_UNAVAILABLE)
        }
        try {
            await this.tagsRepository
                .createQueryBuilder('tags')
                .where('tags.id=:id', {id})
                .update(Tags)
                .set({name})
                .execute()
        }catch(e) {
            throw new HttpException({
                message: '更新失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
        }
        return {
            code: 0,
            message: '更新成功'
        }
    }

    //删除标签
    async deleteTags(id: string, user): Promise<Result> {
        id = String(id)
        const ids = id && id.split(',').filter(i => Number(i)).map(i => Number(i))
        await this.interceptIllegalUser(ids, user)
        const sql = ids ? 'tags.id in (:...id)' : ''
        try {
            await this.tagsRepository
            .createQueryBuilder('tags')
            .delete()
            .where(sql, {id: ids})
            .execute()
        } catch (e) {
            throw new HttpException({
                message: '删除失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
        }
        return {
            code: 0,
            message: '删除成功'
        }
    }

    //禁用标签
    async swtichTagsStatus(id: string, available: number, user): Promise<Result> {
        id = String(id)
        const ids = id && id.split(',').filter(i => Number(i)).map(i => Number(i))
        await this.interceptIllegalUser(ids, user)
        
        const sql = ids ? 'tags.id in (:...id)' : ''
        try {
            await this.tagsRepository
            .createQueryBuilder('tags')
            .update()
            .set({available: available || 0})
            .where(sql, {id: ids})
            .execute()
        } catch (e) {
            throw new HttpException({
                message: '禁用失败' + e
            }, HttpStatus.SERVICE_UNAVAILABLE)
        }
        return {
            code: 0,
            message: '禁用成功'
        }
    }

    //拦截非法用户
    async interceptIllegalUser(id, user):Promise<Boolean> {
        let tags = await this.tagsRepository
            .createQueryBuilder('tags')
            .leftJoinAndSelect('tags.user', 'user')
        let sql = typeof id === 'string' ? 
            'tags.id=:id' :
            'tags.id in (:...id)'
        let count = await tags
            .where(
                sql + ' and user.id=:user_id', 
                {id, user_id: user.id}
            )
            .getCount()
        if (count === 0) {
            throw new HttpException({
                message: '未找到对应标签'
            }, HttpStatus.NOT_FOUND)
        }
        return true
    }

}
