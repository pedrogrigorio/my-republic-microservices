import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'notification',
      protoPath: 'src/proto/notification.proto',
      url: 'notification_service:3005',
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
        groupId: 'notification-service-consumer',
      },
    },
  });

  // Inicia os microsserviços conectados
  await app.startAllMicroservices();

  console.log('Notification Service is running on port 3005 🚀');
}
bootstrap();
