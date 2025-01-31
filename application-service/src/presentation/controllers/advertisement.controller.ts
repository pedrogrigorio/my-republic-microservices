import { CreateAdvertisementUseCase } from 'src/application/use-cases/create-advertisement.usecase';
import { UpdateAdvertisementUseCase } from 'src/application/use-cases/update-advertisement.usecase';
import { DeleteAdvertisementUseCase } from 'src/application/use-cases/delete-advertisement.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('advertisements')
export class AdvertisementController {
  constructor(
    private createAdvertisementUseCase: CreateAdvertisementUseCase,
    private updateAdvertisementUseCase: UpdateAdvertisementUseCase,
    private deleteAdvertisementUseCase: DeleteAdvertisementUseCase,
  ) {}

  @MessagePattern('advertisement.created')
  async handleAdvertisementCreated(@Payload() data: any) {
    console.log('consumiu advertisement created')
    try {
      await this.createAdvertisementUseCase.execute(data)
    } catch (error) {
      console.log(error)
    }
  }

  @MessagePattern('advertisement.updated')
  async handleAdvertisementUpdated(@Payload() data: any) {
    try {
      await this.updateAdvertisementUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }

  @MessagePattern('advertisement.deleted')
  async handleAdvertisementDeleted(@Payload() data: any) {
    try {
      await this.deleteAdvertisementUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }
}
