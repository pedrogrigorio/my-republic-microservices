import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AdvertisementService', 'getAllAdvertisements')
  getHello() {
    console.log('Chegou no serviço de anúncio');
    return {};
  }
}
