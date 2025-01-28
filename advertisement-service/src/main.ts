import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'advertisement',
        protoPath: 'src/proto/advertisement.proto',
        url: 'advertisement_service:3003',
      },
    },
  );

  await app.listen();
  console.log('Advertisement Service is running on port 3003 🚀');
}
bootstrap();
