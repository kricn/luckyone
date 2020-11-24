import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from '../../entity/user.entity';

interface query {
    username?: string,
    id?: string
}

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

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
}
