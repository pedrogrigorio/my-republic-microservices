import { GetApplicationsByAdvertisementUseCase } from './application/use-cases/get-applications-by-advertisement.usecase';
import { GetApplicationsByUserUseCase } from './application/use-cases/get-applications-by-user.usecase';
import { PrismaApplicationRepository } from './infrastructure/repositories/prisma-application.repository';
import { GetAllApplicationsUseCase } from './application/use-cases/get-all-applications.usecase';
import { RefuseApplicationUseCase } from './application/use-cases/refuse-application.usecase';
import { AcceptApplicationUseCase } from './application/use-cases/accept-application.usecase';
import { DeleteApplicationUseCase } from './application/use-cases/delete-applications.usecase';
import { ApplicationController } from './presentation/controllers/application.controller';
import { ApplicationRepository } from './application/interfaces/application.repository.interface';
import { PrismaService } from './infrastructure/services/prisma.service';
import { ApplyUseCase } from './application/use-cases/apply.usecase';
import { Module } from '@nestjs/common';
import { AdvertisementRepository } from './application/interfaces/advertisement.repository.interface';
import { PrismaAdvertisementRepository } from './infrastructure/repositories/prisma-advertisement-repository';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { AdvertisementController } from './presentation/controllers/advertisement.controller';
import { CreateAdvertisementUseCase } from './application/use-cases/create-advertisement.usecase';
import { UpdateAdvertisementUseCase } from './application/use-cases/update-advertisement.usecase';
import { DeleteAdvertisementUseCase } from './application/use-cases/delete-advertisement.usecase';
import { ApplicantController } from './presentation/controllers/applicant.controller';
import { CreateApplicantUseCase } from './application/use-cases/create-applicant.usecase';
import { UpdateApplicantUseCase } from './application/use-cases/update-applicant.usecase';
import { DeleteApplicantUseCase } from './application/use-cases/delete-applicant.usecase';
import { ApplicantRepository } from './application/interfaces/applicant.repository.interface';
import { PrismaApplicantRepository } from './infrastructure/repositories/prisma-applicant-repository';

@Module({
  imports: [
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
  controllers: [ApplicationController, AdvertisementController, ApplicantController],
  providers: [
    ApplyUseCase,
    PrismaService,
    CreateApplicantUseCase,
    UpdateApplicantUseCase,
    DeleteApplicantUseCase,
    RefuseApplicationUseCase,
    AcceptApplicationUseCase,
    DeleteApplicationUseCase,
    GetAllApplicationsUseCase,
    CreateAdvertisementUseCase,
    UpdateAdvertisementUseCase,
    DeleteAdvertisementUseCase,
    GetApplicationsByUserUseCase,
    GetApplicationsByAdvertisementUseCase,
    {
      provide: ApplicationRepository,
      useClass: PrismaApplicationRepository,
    },
    {
      provide: AdvertisementRepository,
      useClass: PrismaAdvertisementRepository,
    },
    {
      provide: ApplicantRepository,
      useClass: PrismaApplicantRepository,
    },
    {
      provide: ClientKafka,
      useFactory: (client: ClientKafka) => client,
      inject: ['KAFKA_CLIENT'],
    },
  ],
})
export class AppModule {}
