import { Module } from '@nestjs/common';
import { WebUserService } from './web-user.service';
import { WebUserController } from './web-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../../entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [WebUserService],
  controllers: [WebUserController]
})
export class WebUserModule {}
