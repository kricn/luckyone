import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user)
    if (user) {
      if (password === user.password) {
        return {
          code: 0,
          user
        }
      } else {
        return {
          code: 1,
          message: '用户名或密码错误',
          user: null
        }
      }
    } else {
      return {
        code: 2,
        message: '用户不存在',
        user: null
      }
    }
  }

  async certificate(user: any) {
    const payload = { username: user.username, id: user.id, nickname: user.nickname, role: user.role };
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}