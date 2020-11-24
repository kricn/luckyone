import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入全局权限守卫')
    const request = context.switchToHttp().getRequest()
    const noAuth = this.reflector.get<boolean>('noAuth', context.getHandler())
    console.log(noAuth)

    // if (this.hasUrl(this.whiteList, request.url)) {
    //   return true
    // }
    const guard = RoleGuard.getAuthGuard(noAuth);
    return guard.canActivate(context); 
  };

  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    // if (noAuth) {
    //   return new (AuthGuard('local'))();
    // } else {
      return new (AuthGuard('jwt'))();
    // }
  }

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
