import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/admin/user/user.module';
import { AuthModule } from './modules/admin/auth/auth.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { RoleGuard } from './common/guard/roles.guard';
import { UploadModule } from './modules/admin/upload/upload.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter'
import { ArticleModule } from './modules/admin/article/article.module';
import { TagsModule } from './modules/admin/tags/tags.module';
import { WebArticleModule } from './modules/web/web-article/web-article.module';



@Module({
  imports: [
    //加载配置
    ConfigModule.load(join(__dirname, 'config', '**/!(*.d).{ts,js}')),

    //数据库配置
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),

    UserModule,
    AuthModule,
    UploadModule,
    ArticleModule,
    TagsModule,
    WebArticleModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
