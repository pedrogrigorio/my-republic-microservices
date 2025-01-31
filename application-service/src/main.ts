import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'application',
      protoPath: 'src/proto/application.proto',
      url: 'application_service:3004',
    },
  });

  // Configuração do Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'application-service-consumer',
      },
    },
  });

  // Inicia os microsserviços conectados
  await app.startAllMicroservices();

  console.log('User Service is running on port 3004 🚀');
}
bootstrap();
