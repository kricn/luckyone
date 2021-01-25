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
    //这里并没有指定jwt策略文件是哪个，但是它怎么知道要用哪个jwt策略文件？
    //是因为在auth.module.ts里的providers注入了jwt的策略，它会寻找导入了passport-jwt包的文件
    //参考 @/modules/admin/auth/auth.module.ts 第 18 行
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

// 新建jwt.strategy.ts
// @/modules/admin/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  ) {
    //继承需要的属性
    super({
      //从哪个位置获取token
      //一种是自定义的token名称
      //一种是官方的Authorization
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  
  //进入路由守卫会调用这个方法，成功的话会将return的对象写入到request的user中
  //在controller里用装饰器@Request()获取
  async validate(payload: any, done: Function) {
    return { id: payload.id, username: payload.username };
  }
}
```

## typeorm对mysql的操作及query builder的使用
### 配置数据库
在app.module.ts里import { ConfigModule, ConfigService } from 'nestjs-config';\
这个可以用来加载提取出来的配置
```javascript
// 其它依赖忽略
import { ConfigModule, ConfigService } from 'nestjs-config';
@Module({
  //这个imports也可以将其他modules导入
  imports: [
    // 加载配置
    // 提取出来的配置信息
    ConfigModule.load(join(__dirname, 'config', '**/!(*.d).{ts,js}')),

    //数据库配置
    // 异步加载数据库配置
    // 数据库配置里加载了数据库实体，每个实体(entity)对就着数据库里的一张表
    // 详见 @/entity
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
  ]
})
```
### 实体之间的关系
实体关系分一对一，一对多/多对一（关系可以是双向的），多对多
```javascript
// 主表 以article为例子
import { OneToMany, } from "typeorm";
import { Comment } from './comment.entity'
@Entity()
export class Article {
  //省略其它字段
  //Article实体与Comment实体形成一对多关系
  // comment => comment.article 表示实现双向关系
  //即通过查comment也可以查到article
    @OneToMany(type => Comment, comment => comment.article)
    comment: Comment[]
}
/**************************************/
// 从表 以comment为例
import { ManyToOne, JoinColumn } from "typeorm";
import { Article } from './article.entity'
@Entity()
export class Comment {
  // 省略其它字段
  // comment会形成外键，约束article的删除
    @ManyToOne(type => Article, article => article.comment, {
      // 设置为set null，即article时，comment对应的article_id会变为null
        onDelete: 'SET NULL'
    })
    //设置关联字段的别名，不写默认为articleId
    //从表里关联主表的字段需要用@JoinColumn装饰
    //直接连接实体可以查到article_id列，这里和多对多关系有点区别
    //注：多对多关系不能直接查到关联列的字段
    @JoinColumn({name: 'article_id'})
    article: Article
}
/**************************************************/
// 保存这种关系
// 在创建 article 的同时创建comment（一般创建article是不会创建comment的，这里演示关系的保存）
// 引入article实体和comment实体，其实实体就是一个类
let article = new Article()
let comment = new Comment()
//给comment添加值，通过.运算符添加
//没给comment赋值则关联之后只有article_id有值，其它字段为null
comment.username = 'tom'
comment.content = 'hello'
//保存实体，要先保存comment实体才能关联
//保存语句，也可以用query builder，详见下面
//这些操作都是异步的，用async await好处理
await this.commentRepository.save(comment)
//将comment赋值给article
//这里是个数组，因为定义的时候是数组类型，初始化多个comment的时候直接传入一个数组
article.comment = [comment]
//保存article
await this.articleRepository.save(article)
/*****************************************************/
//
```