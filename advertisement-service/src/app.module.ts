import { Module } from '@nestjs/common';
import { AdvertisementController } from './presentation/controllers/advertisement.controller';
import { StateController } from './presentation/controllers/state.controller';
import { CityController } from './presentation/controllers/city.controller';
import { AdvertisementRepository } from './application/interfaces/advertisement.repository.interface';
import { AmenityRepository } from './application/interfaces/amenity.repository.interface';
import { CityRepository } from './application/interfaces/city.repository.interface';
import { LocaleService } from './application/interfaces/locale.service.interface';
import { RuleRepository } from './application/interfaces/rule.repository.interface';
import { StateRepository } from './application/interfaces/state.repository.interface';
import { CreateAdvertisementUseCase } from './application/use-cases/create-advertisement.usecase';
import { DeleteAdvertisementUseCase } from './application/use-cases/delete-advertisement.usecase';
import { GetAdvertisementByIdUseCase } from './application/use-cases/get-advertisement-by-id.usecase';
import { GetAdvertisementsByOwnerUseCase } from './application/use-cases/get-advertisements-by-owner.usecase';
import { GetAllAdvertisementsUseCase } from './application/use-cases/get-all-advertisements.usecase';
import { GetAllCitiesUseCase } from './application/use-cases/get-all-cities.usecase';
import { GetAllStatesUseCase } from './application/use-cases/get-all-states.usecase';
import { GetCitiesByStateIdUseCase } from './application/use-cases/get-cities-by-state-id.usecase';
import { IncrementOccupiedSlotsUseCase } from './application/use-cases/increment-occupied-slots.usecase';
import { PauseAdvertisementUseCase } from './application/use-cases/pause-advertisement.usecase';
import { SearchAdvertisementsByCityUseCase } from './application/use-cases/search-advertisements-by-city';
import { SearchCitiesUseCase } from './application/use-cases/search-cities.usecase';
import { UpdateAdvertisementUseCase } from './application/use-cases/update-advertisement.usecase';
import { PrismaAdvertisementRepository } from './infratructure/repositories/prisma-advertisement-repository';
import { PrismaAmenityRepository } from './infratructure/repositories/prisma-amenity-repository';
import { PrismaCityRepository } from './infratructure/repositories/prisma-city-repository';
import { PrismaRuleRepository } from './infratructure/repositories/prisma-rule-repository';
import { PrismaStateRepository } from './infratructure/repositories/prisma-state-repository';
import { IBGELocaleService } from './infratructure/services/ibge-locale.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './infratructure/services/prisma.service';
import { StorageService } from './application/interfaces/storage.service.interface';
import { S3StorageService } from './infratructure/services/s3-storage.service';
import { ConfigModule } from '@nestjs/config';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { OwnerController } from './presentation/controllers/owner.controller';
import { OwnerRepository } from './application/interfaces/owner.repository.interface';
import { PrismaOwnerRepository } from './infratructure/repositories/prisma-owner-repository';
import { CreateOwnerUseCase } from './application/use-cases/create-owner.usecase';
import { UpdateOwnerUseCase } from './application/use-cases/update-owner.usecase';
import { DeleteOwnerUseCase } from './application/use-cases/delete-owner.usecase';

@Module({
  imports: [
    HttpModule, 
    ConfigModule.forRoot({ isGlobal: true }), 
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [AdvertisementController, StateController, CityController, OwnerController],
  providers: [
    SearchAdvertisementsByCityUseCase,
    GetAdvertisementsByOwnerUseCase,
    IncrementOccupiedSlotsUseCase,
    GetAllAdvertisementsUseCase,
    GetAdvertisementByIdUseCase,
    DeleteAdvertisementUseCase,
    CreateAdvertisementUseCase,
    UpdateAdvertisementUseCase,
    PauseAdvertisementUseCase,
    GetCitiesByStateIdUseCase,
    SearchCitiesUseCase,
    GetAllCitiesUseCase,
    GetAllStatesUseCase,
    CreateOwnerUseCase,
    UpdateOwnerUseCase,
    DeleteOwnerUseCase,
    PrismaService,
    {
      provide: AdvertisementRepository,
      useClass: PrismaAdvertisementRepository,
    },
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: StateRepository,
      useClass: PrismaStateRepository,
    },
    {
      provide: AmenityRepository,
      useClass: PrismaAmenityRepository,
    },
    {
      provide: RuleRepository,
      useClass: PrismaRuleRepository,
    },
    {
      provide: OwnerRepository,
      useClass: PrismaOwnerRepository,
    },
    {
      provide: LocaleService,
      useClass: IBGELocaleService,
    },
    {
      provide: StorageService,
      useClass: S3StorageService,
    },
    {
      provide: ClientKafka,
      useFactory: (client: ClientKafka) => client,
      inject: ['KAFKA_CLIENT'],
    },
  ],
})
export class AppModule {}
