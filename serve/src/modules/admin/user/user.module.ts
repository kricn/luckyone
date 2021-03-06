import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../../../entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Profile } from 'src/entity/profile.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Profile]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
