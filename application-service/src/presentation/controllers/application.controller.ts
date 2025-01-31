import { GetApplicationsByAdvertisementUseCase } from '../../application/use-cases/get-applications-by-advertisement.usecase';
import { GetApplicationsByUserUseCase } from '../../application/use-cases/get-applications-by-user.usecase';
import { GetAllApplicationsUseCase } from '../../application/use-cases/get-all-applications.usecase';
import { DeleteApplicationUseCase } from '../../application/use-cases/delete-applications.usecase';
import { RefuseApplicationUseCase } from '../../application/use-cases/refuse-application.usecase';
import { AcceptApplicationUseCase } from '../../application/use-cases/accept-application.usecase';
import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { ApplyUseCase } from '../../application/use-cases/apply.usecase';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('applications')
export class ApplicationController {
  constructor(
    private applyUseCase: ApplyUseCase,
    private deleteApplicationUseCase: DeleteApplicationUseCase,
    private getAllApplicationsUseCase: GetAllApplicationsUseCase,
    private getApplicationsByUserUseCase: GetApplicationsByUserUseCase,
    private getApplicationsByAdvertisementUseCase: GetApplicationsByAdvertisementUseCase,
    private refuseApplicationUseCase: RefuseApplicationUseCase,
    private acceptApplicationUseCase: AcceptApplicationUseCase,
  ) {}

  @GrpcMethod('ApplicationService', 'getAllApplications')
  async getAllApplications() {
    try {
      const applications = await this.getAllApplicationsUseCase.execute();
      return { applications }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'getApplicationsByUser')
  async getApplicationsByUser(data: any) {
    try {
      return await this.getApplicationsByUserUseCase.execute(data.userId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'getApplicationsByAdvertisement')
  async getApplicationsByAdvertisement(data: any) {
    try {
      return await this.getApplicationsByAdvertisementUseCase.execute(data.advertisementId);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'apply')
  async apply(data: any) {
    try {
      console.log('Chegou requisição', data)
      await this.applyUseCase.execute(
        data.userId,
        data.body,
      );
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'refuseApplication')
  async refuseApplication(data: any) {
    try {
      await this.refuseApplicationUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'acceptApplication')
  async acceptApplication(data: any) {
    try {
      await this.acceptApplicationUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('ApplicationService', 'deleteApplication')
  async deleteApplication(data: any) {
    try {
      await this.deleteApplicationUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
