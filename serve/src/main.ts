import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import * as serveStatic from 'serve-static';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'public')); 
  app.use('', serveStatic(join(__dirname, '../public'), {
    maxAge: '1d',
    // extensions: ['jpg', 'jpeg', 'png', 'gif'],
   }));
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
