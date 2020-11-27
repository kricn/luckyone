import { HttpException, HttpStatus, Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection  } from 'typeorm';
import {User} from '../../entity/user.entity';
import { Profile } from '../../entity/profile.entity'
import { writeImage } from '../../utils/common'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>
    ){}

    async findUser(username: string) {
        return await this.userRepository.findOne({
            where: {username: username}
        })
    }

    async register (req: any): Promise<any> {
        const { username, password } = req;
        const user = await this.findUser(username);
        if (user) {
            throw new HttpException({
                message: '用户已存在'
            }, HttpStatus.BAD_REQUEST)
        }
        try {
            let user = new User()
            user = Object.assign({}, req)
            let profile = new Profile()
            await this.profileRepository.save(profile)
            user.profile = profile
            await this.userRepository.save(user)    
            return {
                code: 0,
                msg: '注册成功'
            }
        } catch(e) {
            throw new HttpException({
                message: '服务器发生错误，注册失败'
            }, HttpStatus.SERVICE_UNAVAILABLE)
        }
    }

    // async findUser(username) {
    //     const user = await getConnection()
    //         .createQueryBuilder()
    //         .select(['u.username', 'u.nickname', 'u.role'])
    //         .from(User, 'u')
    //         .leftJoinAndSelect("u.profile", "profile")
    //         .where(`u.username = :username`, {username: username})
    //         .getOne()
    //     return user
    // }

    async findOne(username) {
        return await this.userRepository.findOne({
            where: {
                username: username
            }
        })
    }

    async find(options) {
        const user = await getConnection()
            .createQueryBuilder()
            .select(['u.id', 'u.username', 'u.nickname', 'u.role'])
            .from(User, 'u')
            .where(
                `${options.where.username?'u.username like :username':''}
                 ${options.where.id?'or u.id = :id':''}
                `,
                {
                    username: '%'+options.where.username+'%',
                    id: options.where.id
                }
            )
            .skip(options.skip || 0)
        if (options.take == -1 || options.take < 0) {
            return user.getMany()
        }
        return user.take(options.take || 10).getMany()
    }

    async update(body, user) {
        let target = '/profile'
        const { cover, avatar, article, summary } = body
        const cover_path = await writeImage(cover, target)
        const avatar_path = await writeImage(avatar, target)
        let profile = await getConnection()
            .createQueryBuilder()
            .update(Profile)
            .set({
                cover: cover_path,
                avatar: avatar_path,
                article,
                summary
            })
            .where("user_id=:id", {id: user.id})
            .execute()
        return profile
    }
}
