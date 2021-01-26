import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../modules/admin/auth/auth.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( 
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {
    // super()
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const noAuth = this.reflector.get<boolean>('noAuth', context.getHandler())
    const token = request.headers.token
    if (this.hasUrl(this.whiteList, request.url) || noAuth) {
      return true
    }
    const { isValidateToken, errMsg } = await this.authService.validateToken(token)
    if (!isValidateToken) {
      throw new HttpException({
        message: errMsg
      }, HttpStatus.UNAUTHORIZED)
    }
    // return this.activate(context)
    return new (AuthGuard('jwt'))().canActivate(context) as Promise<boolean>
    // const guard = RoleGuard.getAuthGuard(noAuth);
    // return guard.canActivate(context); 
  };

  private whiteList: string[] = [
    '/admin/user/login',
    '/admin/user/register'
  ];

  // async activate(context: ExecutionContext): Promise<boolean> {
  //   return super.canActivate(context) as Promise<boolean>;
  // }

  private hasUrl(whiteList: string[], url: string): boolean {
    let flag: boolean = false
    if (whiteList.indexOf(url) >= 0) {
      flag = true;
    }
    return flag;
  }

}
