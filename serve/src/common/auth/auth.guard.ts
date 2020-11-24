import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入全局权限守卫')
    const request = context.switchToHttp().getRequest()
    const token = context.switchToRpc().getData().headers.token;

    if (this.hasUrl(this.whiteList, request.url)) {
      return true
    }

    if (token) {
      try {
        return true
      } catch(e) {
        throw new HttpException('未授权', HttpStatus.UNAUTHORIZED)
      }
    } else {
      throw new HttpException('未授权', HttpStatus.UNAUTHORIZED)
    }
  };

  private whiteList: string[] = [
    '/user/login',
    '/user/register'
  ];

  private hasUrl(whiteList: string[], url: string): boolean {
    let flag: boolean = false
    if (whiteList.indexOf(url) >= 0) {
      flag = true;
    }
    return flag;
  }

}
