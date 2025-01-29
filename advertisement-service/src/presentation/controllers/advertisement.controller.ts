import { SearchAdvertisementsByCityUseCase } from '../../application/use-cases/search-advertisements-by-city';
import { GetAdvertisementsByOwnerUseCase } from '../../application/use-cases/get-advertisements-by-owner.usecase';
import { GetAllAdvertisementsUseCase } from '../../application/use-cases/get-all-advertisements.usecase';
import { GetAdvertisementByIdUseCase } from '../../application/use-cases/get-advertisement-by-id.usecase';
import { DeleteAdvertisementUseCase } from '../../application/use-cases/delete-advertisement.usecase';
import { UpdateAdvertisementUseCase } from '../../application/use-cases/update-advertisement.usecase';
import { CreateAdvertisementUseCase } from '../../application/use-cases/create-advertisement.usecase';
import { PauseAdvertisementUseCase } from '../../application/use-cases/pause-advertisement.usecase';
import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('advertisements')
export class AdvertisementController {
  constructor(
    private searchAdvertisementsByCityUseCase: SearchAdvertisementsByCityUseCase,
    private getAdvertisementsByOwnerUseCase: GetAdvertisementsByOwnerUseCase,
    private getAllAdvertisementsUseCase: GetAllAdvertisementsUseCase,
    private deleteAdvertisementUseCase: DeleteAdvertisementUseCase,
    private createAdvertisementUseCase: CreateAdvertisementUseCase,
    private updateAdvertisementUseCase: UpdateAdvertisementUseCase,
    private pauseAdvertisementUseCase: PauseAdvertisementUseCase,
    private getAdvertisementById: GetAdvertisementByIdUseCase,
  ) {}

  @GrpcMethod('AdvertisementService', 'getAllAdvertisements')
  async getAllAdvertisements() {
    try {
      const advertisements = await this.getAllAdvertisementsUseCase.execute();
      return { advertisements }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('AdvertisementService', 'searchAdvertisementsByCity')
  async searchAdvertisementsByCity(data: any) {
    try {
      return await this.searchAdvertisementsByCityUseCase.execute(
        data.cityId,
        data.pageNumber,
        data.pageSizeNumber,
      );
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
    
  }

  @GrpcMethod('AdvertisementService', 'getAdvertisementByOwner')
  async getAdvertisementByOwner(data: any) {
    try {
      return await this.getAdvertisementsByOwnerUseCase.execute(
        data.ownerId,
        data.pageNumber,
        data.pageSizeNumber,
      );
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
  
  @GrpcMethod('AdvertisementService', 'getAdvertisementById')
  async getAdvertisement(data: any) {
    try {
      const advertisement = await this.getAdvertisementById.execute(data.id);
      return { advertisement }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('AdvertisementService', 'createAdvertisement')
  async createAdvertisement(data: any) {
    try {
      await this.createAdvertisementUseCase.execute(data.file, data.createAdvertisementDto);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('AdvertisementService', 'updateAdvertisement')
  async updateAdvertisement(data: any) {
    try {
      await this.updateAdvertisementUseCase.execute(
        data.updateAdvertisementDto,
        data.id,
        data.file,
      );
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('AdvertisementService', 'pauseAdvertisement')
  async pauseAdvertisement(data: any) {
    try {
      await this.pauseAdvertisementUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('AdvertisementService', 'deleteAdvertisement')
  async deleteAdvertisement(data: any) {
    try {
      await this.deleteAdvertisementUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
