import { GetCitiesByStateIdUseCase } from '../../application/use-cases/get-cities-by-state-id.usecase';
import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { GetAllCitiesUseCase } from '../../application/use-cases/get-all-cities.usecase';
import { SearchCitiesUseCase } from '../../application/use-cases/search-cities.usecase';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('cities')
export class CityController {
  constructor(
    private getAllCitiesUseCase: GetAllCitiesUseCase,
    private searchCitiesUseCase: SearchCitiesUseCase,
    private getCitiesByStateIdUseCase: GetCitiesByStateIdUseCase,
  ) {}

  @GrpcMethod('CityService', 'getAllCities')
  async getAllCities() {
    console.log('Get todos os estados');
    try {
      const cities = await this.getAllCitiesUseCase.execute();
      return { cities }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('CityService', 'getCitiesByState')
  async getCitiesByState(data: any) {
    try {
      const id = parseInt(data.stateid);

      const cities = await this.getCitiesByStateIdUseCase.execute(id);
      return { cities }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('CityService', 'searchCities')
  async searchCities(data: any) {
    try {
      const cities = await this.searchCitiesUseCase.execute(data.term);
      return { cities }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
