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

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [
    ApplyUseCase,
    PrismaService,
    RefuseApplicationUseCase,
    AcceptApplicationUseCase,
    DeleteApplicationUseCase,
    GetAllApplicationsUseCase,
    GetApplicationsByUserUseCase,
    GetApplicationsByAdvertisementUseCase,
    {
      provide: ApplicationRepository,
      useClass: PrismaApplicationRepository,
    },
  ],
})
export class AppModule {}
