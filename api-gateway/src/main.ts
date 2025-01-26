import { GrpcExceptionFilter } from './core/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GrpcExceptionFilter());
  await app.startAllMicroservices();
  await app.listen(3001);
  console.log('API Gateway running on port 3001');
}
bootstrap();
