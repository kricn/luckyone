import { HttpException, HttpStatus, Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection  } from 'typeorm';
import {User} from '../../entity/user.entity';
import { Profile } from '../../entity/profile.entity'
import { join } from 'path'
import * as fs from 'fs'
// import { writeImage } from '../../utils/common'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>
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
            return {
                code: 503,
                msg: `Server error ${e}`
            }
        }
    }

    async findUser(username) {
        const user = await getConnection()
            .createQueryBuilder()
            .select(['u.username', 'u.nickname', 'u.role'])
            .from(User, 'u')
            .leftJoinAndSelect("u.profile", "profile")
            .where(`u.username = :username`, {username: username})
            .getOne()
        return user
    }

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

    async update(body) {
        let root = join(__dirname, '../../', '/public')
        let cover_target_path = join(__dirname, '../../', '/public/profile')
        if (!fs.existsSync(cover_target_path)) {
            fs.mkdir(cover_target_path, { recursive: true }, (err) => {
                if (err) throw err;
              });
        }
        let cover = body.cover
        let avatar = body.avatar
        let article = body.article

        // await writeImage(root + cover, cover_target_path)
        const reader = fs.createReadStream(root + cover)
        const writer = fs.createWriteStream(cover_target_path + `/cover.png`)
        reader.pipe(writer)
        let profile = await getConnection()
            .createQueryBuilder()
            .update(Profile)
            .set({cover})
            .where("user_id=:id", {id: body.id})
            .execute()
        return profile
    }
}
