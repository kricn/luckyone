import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  

  async validate(payload: any, done: Function) {
    console.log(payload)
    const user = await this.userService.findUser(payload.username)
    if (!user) {
      throw new HttpException({
        message: '未知用户'
      }, HttpStatus.UNAUTHORIZED)
    }
    return { id: payload.id, username: payload.username };
  }
}