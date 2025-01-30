import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOwnerUseCase } from 'src/application/use-cases/create-owner.usecase';
import { UpdateOwnerUseCase } from 'src/application/use-cases/update-owner.usecase';
import { DeleteOwnerUseCase } from 'src/application/use-cases/delete-owner.usecase';
import { Controller } from '@nestjs/common';

@Controller('owners')
export class OwnerController {
  constructor(
    private createOwnerUseCase: CreateOwnerUseCase,
    private updateOwnerUseCase: UpdateOwnerUseCase,
    private deleteOwnerUseCase: DeleteOwnerUseCase,
  ) {}

  @MessagePattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    try {
      await this.createOwnerUseCase.execute(data)
    } catch (error) {
      console.log(error)
    }
  }

  @MessagePattern('user.updated')
  async handleUserUpdated(@Payload() data: any) {
    try {
      await this.updateOwnerUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }

  @MessagePattern('user.deleted')
  async handleUserDeleted(@Payload() data: any) {
    try {
      await this.deleteOwnerUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }
}
