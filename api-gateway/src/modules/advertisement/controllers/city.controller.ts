// import { Controller, Get, Post, Query } from '@nestjs/common';
// import { PopulateCitiesUseCase } from '../../application/use-cases/populate-cities.usecase';
// import { GetAllCitiesUseCase } from '../../application/use-cases/get-all-cities.usecase';
// import { SearchCitiesUseCase } from '../../application/use-cases/search-cities.usecase';
// import { isPublic } from '@src/core/decorators/is-public.decorator';
// import { GetCitiesByStateIdUseCase } from '../../application/use-cases/get-cities-by-state-id.usecase';

// @Controller('cities')
// export class CityController {
//   constructor(
//     private getAllCitiesUseCase: GetAllCitiesUseCase,
//     private populateCitiesUseCase: PopulateCitiesUseCase,
//     private searchCitiesUseCase: SearchCitiesUseCase,
//     private getCitiesByStateIdUseCase: GetCitiesByStateIdUseCase,
//   ) {}

//   @Get()
//   async getAllCities() {
//     return await this.getAllCitiesUseCase.execute();
//   }

//   @Get('by-state')
//   async getCitiesByState(@Query('stateId') stateId: string) {
//     const id = parseInt(stateId);

//     return await this.getCitiesByStateIdUseCase.execute(id);
//   }

//   @Get('search')
//   async searchCities(@Query('term') searchTerm: string) {
//     return await this.searchCitiesUseCase.execute(searchTerm);
//   }

//   @isPublic()
//   @Post('populate')
//   async populateCities() {
//     return await this.populateCitiesUseCase.execute();
//   }
// }
