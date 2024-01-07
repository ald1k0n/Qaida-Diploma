import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
