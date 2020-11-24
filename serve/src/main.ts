import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AuthGuard } from './common/auth/auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //全局权限守卫
  app.useGlobalGuards(new AuthGuard())


  await app.listen(3000);
}
bootstrap();
