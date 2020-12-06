import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password?: string): Promise<any> {
    const user = await this.usersService.findUser(username);
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
        code: 0,
        data: {
          user: {
            username: user.username,
            nickname: user.nickname,
            role: user.role,
          },
          token,
        },
        message: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        message: `账号或密码错误`,
      };
    }
  }
}