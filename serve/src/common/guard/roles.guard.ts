import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const noAuth = this.reflector.get<boolean>('noAuth', context.getHandler())

    if (this.hasUrl(this.whiteList, request.url) || noAuth) {
      return true
    }

    return new (AuthGuard('jwt'))().canActivate(context)
    // const guard = RoleGuard.getAuthGuard(noAuth);
    // return guard.canActivate(context); 
  };

  // private static getAuthGuard(noAuth: boolean): IAuthGuard {
  //   if (noAuth) {
  //     return new (AuthGuard('local'))();
  //   } else {
  //     return new (AuthGuard('jwt'))();
  //   }
  // }

  private whiteList: string[] = [
    '/admin/user/login',
    '/admin/user/register'
  ];

  private hasUrl(whiteList: string[], url: string): boolean {
    let flag: boolean = false
    if (whiteList.indexOf(url) >= 0) {
      flag = true;
    }
    return flag;
  }

}
