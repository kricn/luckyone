import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'public')); 
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
