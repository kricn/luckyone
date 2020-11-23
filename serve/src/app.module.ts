import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    //加载配置
    ConfigModule.load(join(__dirname, 'config', '**/!(*.d).{ts,js}')),

    //数据库配置
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),

    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
