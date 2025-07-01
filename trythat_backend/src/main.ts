import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);

  // register all plugins and extension
  // app.setGlobalPrefix('api');

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      // whitelist: true,
    }),
  );
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(configService.get('port'));
}
bootstrap();
