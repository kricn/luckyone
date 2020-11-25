import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Like  } from 'typeorm';
import {User} from '../../entity/user.entity';
import { Avatar } from '../../entity/avatar.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Avatar) private readonly avatarReppository: Repository<Avatar>
    ){}

    async login(username: string) {
        return await this.userRepository.findOne({
            where: {username: username}
        })
    }

    async register (req: any): Promise<any> {
        const { username, password } = req;
        if (!password) {
            return {
                code: 400,
                msg: '密码不能为空'
            }
        }
        const user = await this.findUser(username);
        if (user) {
            return {
                code: 400,
                msg: '用户已存在'
            }
        }
        try {
            await this.userRepository.save(req)    
            return {
                code: 0,
                msg: '注册成功'
            }
        } catch(e) {
            return {
                code: 503,
                msg: `Server error ${e}`
            }
        }
    }

    async findUser(username) {
        return await this.userRepository.findOne({
            where: {
                username: username
            }
        })
    }

    async find(options) {
        const user = await getRepository(User)
            .createQueryBuilder('u')
            .select(['u.id', 'u.username', 'u.nickname', 'u.role'])
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

    async uploadAvatar() {
        const avatar = new Avatar()
        const user = new User()
        avatar.name = 'test'
        avatar.avatar_url = 'www.test.com'
        await this.avatarReppository.save(avatar)
        user.username = "test" + Math.random()
        user.password = "test"
        user.avatar = avatar
        return await this.userRepository.save(user)
    }
}
