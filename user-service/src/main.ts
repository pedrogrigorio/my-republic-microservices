import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'user',
  //       protoPath: 'src/proto/user.proto',
  //       url: 'user_service:3002',
  //     },
  //   },
  // );

  // await app.listen();
  const app = await NestFactory.create(AppModule);

  // Configuração do gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: 'src/proto/user.proto',
      url: 'user_service:3002',
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
        groupId: 'user-service-consumer',
      },
    },
  });

  // Inicia os microsserviços conectados
  await app.startAllMicroservices();

  console.log('User Service is running on port 3002 🚀');
}
bootstrap();
