import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'advertisement',
      protoPath: 'src/proto/advertisement.proto',
      url: 'advertisement_service:3003',
    },
  });

  // Configuração do Kafka
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'], // Endereço do seu broker Kafka
      },
      consumer: {
        groupId: 'advertisement-service-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  
  console.log('Advertisement Service is running on port 3003 🚀');
}
bootstrap();
