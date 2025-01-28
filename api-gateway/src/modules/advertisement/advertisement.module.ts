import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { AdvertisementController } from './controllers/advertisement.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADVERTISEMENT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'advertisement',
          protoPath: 'src/modules/advertisement/proto/advertisement.proto',
          url: 'advertisement_service:3003',
        },
      },
    ]),
  ],
  controllers: [AdvertisementController],
  providers: [],
  exports: [],
})
export class AdvertisementModule {}
