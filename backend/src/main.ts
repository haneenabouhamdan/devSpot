import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './common/middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });

  app.useBodyParser('json', { limit: '50mb' });

  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });

  app.use(logger);
  await app.listen(3000);
  console.info(`🚀🚀🚀 devSpot app started 🚀🚀🚀`);
}
bootstrap();
