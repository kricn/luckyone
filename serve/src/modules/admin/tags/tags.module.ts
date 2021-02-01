import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from 'src/entity/tags.entity';
import { User } from '../../../entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tags, User])
  ],
  providers: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}
