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
import { AuthService } from '../../modules/admin/auth/auth.service'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector) {}
  //继承自CanActivate接口
  //必须实现canActivate方法
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //获取request请求体
    const request = context.switchToHttp().getRequest()
    // 获取请求头的token
    const token = request.headers.token
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
    // 验证token是否失效
    const { isValidateToken, errMsg } = await this.authService.validateToken(token)
    if (!isValidateToken) {
      //抛出错误
      throw new HttpException({
        message: errMsg
      }, HttpStatus.UNAUTHORIZED)
    }
    // 因为继承了 CanActivate 接口，此不能直接返回 true
    // 不然 token 验证正确直接放行，但请求体里不会被注入用户信息
    // 应该返回一个新的 jwt 上下文验证
    // 由于定义了返回类型，所以要加个断言
    return new (AuthGuard('jwt'))().canActivate(context) as Promise<boolean>

    /*
      第二种直接继承 AuthGuard('jwt') 类
      直接 return this.canActivate(content) as Promise<boolean>
    */
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
#### 一对一关系
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
      // 也可以设置为CASCADE, 表示级联，对应的comment随着article一起删除
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
// 获取这种关系
// 通过repository或query builder查询，以query builder为例
// 左联comment，并给comment配置别名，别名在整个builder对象都可使用
this.articleRepository.createQueryBuilder('article')
    .leftJoinAndSelect('article.comment', 'comment')
    .getManyAndCount()
//更新主表和从表直接用where判断更新即可
//因为在表中有保留了关联字段
```
#### 多对多关系
多对多关系不会在连表时在相关表建立关联字段\
而是会额外间一张表来保存这种关系
```javascript
// 主表 以 tags 为例
import {ManyToMany } from "typeorm";
import { Article } from './article.entity'
@Entity()
export class Tags {
  //省略其他字段
  //建立双向关系
    @ManyToMany(type => Article, articles => articles.tags)
    articles: Article[]
}
// 从表 以 article 为例
import { ManyToMany, JoinTable } from "typeorm";
import { Tags } from "./tags.entity";
@Entity()
export class Article {
  // 省略其他字段
  // 作为从表，需要用JoinTable()装饰字段
    @ManyToMany(type => Tags, tags => tags.articles)
    @JoinTable()
    tags: Tags[]
}
/**********************************************************/
// 保留这种关系
// 其实建立了多对多关系的关联表后关系就已经建立了
// 新建关系
let article = new Article()
article.title = 'hello world'
//省略其他字段的填写
//tags为传入的值，类型是number[]
// article.tags = tags  // 这种写法不会建立不了联系，因为article.tags接受的类型是Tags[]类型
                     // 可以说是实体数组类型，即Tags类数组类型
// 正确写法
article.tags = await this.tagsRepository.find({id})  // 返回一个数组即可
// 通过save保留这种关系
this.articleRepository.save(article)
/*************************************************************/
// 更新这种关系
// 先创建builder对象
// builder对象主要是用来更新其他在表里的字段的
const articleBuilder = await this.articleRepository
                    .createQueryBuilder('article')
                    .where('article.id=:id', {id})
// 获取到指定的article
let article = await articleBuilder.getOne();
// 更新指定 article 的 tags，因为是连表关系，所以其原型上有 tags 属性
// 直接查询 article 是不会显示 tags，连接 tags 表查询才会显示 tags
(await article).tags = await this.tagsRepository
                        .createQueryBuilder('i')
                        .where('i.id in (:...id)', {id: tags})
                        .getMany()
// 和新建关系一样，通过save更新关系
// save方法是数据库里有就更新，没有就新建
await this.articleRepository.save(article)
// 更新其它字段的内容
// 这些内容是表中存在的字段，直接更新即可
await articleBuilder.update(Article).set({title, content, summary, cover: tempCover, words}).execute()
```