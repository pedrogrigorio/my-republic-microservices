import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { CityService } from '../services/city.service';
import { firstValueFrom } from 'rxjs';

@Controller('cities')
export class CityController {
  private cityService: CityService;

  constructor(
    @Inject('ADVERTISEMENT_SERVICE')
    private advertisementClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.cityService =
      this.advertisementClient.getService<CityService>('CityService');
  }

  @Get()
  async getAllCities() {
    const { cities } = await firstValueFrom(
      this.cityService.getAllCities({}),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return cities;
  }

  @Get('by-state')
  async getCitiesByState(@Query('stateId') stateId: string) {
    const id = parseInt(stateId);

    const { cities } = await firstValueFrom(
      this.cityService.getCitiesByState({ stateId: id }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return cities;
  }

  @Get('search')
  async searchCities(@Query('term') searchTerm: string) {
    const { cities } = await firstValueFrom(
      this.cityService.searchCities({ term: searchTerm }),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return cities;
  }
}
