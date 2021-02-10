import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../entity/user.entity'

import { Result } from '../../../common/interface/result.interface'

@Injectable()
export class WebUserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username) {
    const sql = !username ? 'user.role=1' :
      'user.username=:username'
    const res = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where(sql, {username})
      .getOne()
    return {
      ...res,
      profile: {
        ...res.profile,
        access_avatar_url: res.profile.avatar ? process.env.DOMAIN + res.profile.avatar : '',
        access_cover_url: res.profile.cover ? process.env.DOMAIN + res.profile.cover : '',
      }
    }
  }

}
