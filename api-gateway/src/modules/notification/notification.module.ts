import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: 'src/modules/notification/proto/notification.proto',
          url: 'notification_service:3004',
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
