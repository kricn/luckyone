# nest的一些流程和总结
## 全局路由守卫和jwt全局验证
```shell
# 安装依赖
# passport-jwt 和 passport-local 是两种不同策略
npm install --save @nestjs/passport @nestjs/core rxjs passport-jwt
```
```javascript
// 新建roles.guard.ts
// @/common/guard/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector) {}
  //继承自CanActivate接口
  //必须实现canActivate方法
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //获取request请求体
    const request = context.switchToHttp().getRequest()
    //reflector映射，给对应接口加上@noAuth装饰器后会被获取并返回true
    //因为是全局jwt验证，有些接口并不需要jwt验证，通过这样来跳过jwt验证
    //此处没有用到
    const noAuth = this.reflector.get<boolean>('noAuth', context.getHandler())

    if (this.hasUrl(this.whiteList, request.url) || noAuth) {
      //返回true就放行
      return true
    }
    //添加jwt验证，会验证请求体里的token，具体在 @/modules/admin/auth/jwt.strategy.ts
    return new (AuthGuard('jwt'))().canActivate(context)
  };

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

```