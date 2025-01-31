import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApplicationController } from './application.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APPLICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'application',
          protoPath: 'src/modules/application/proto/application.proto',
          url: 'application_service:3004',
        },
      },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
