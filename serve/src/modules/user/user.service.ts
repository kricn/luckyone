import { Injectable } from '@nestjs/common';
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

    async find(options) {
        return await this.userRepository.find(options)
    }

    async register(options) {
        return await this.userRepository.save(options)
    }
}
