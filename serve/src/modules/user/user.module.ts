import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../../entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Avatar } from 'src/entity/avatar.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Avatar]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
