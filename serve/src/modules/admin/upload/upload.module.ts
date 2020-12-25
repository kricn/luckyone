import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { join } from 'path'

import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';

@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: join(__dirname, '../../', `/public/upload`),
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${dayjs().valueOf()}_${file.originalname}`;
          return cb(null, filename);
        },
      }),
    }),

  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule {}
