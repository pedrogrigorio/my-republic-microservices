import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: 'src/proto/user.proto',
        url: 'localhost:3002',
      },
    },
  );

  await app.listen();
  console.log('User Service is running on port 3002 🚀');
}
bootstrap();
