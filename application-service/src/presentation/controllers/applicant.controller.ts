import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateApplicantUseCase } from 'src/application/use-cases/create-applicant.usecase';
import { UpdateApplicantUseCase } from 'src/application/use-cases/update-applicant.usecase';
import { DeleteApplicantUseCase } from 'src/application/use-cases/delete-applicant.usecase';
import { Controller } from '@nestjs/common';

@Controller('applicants')
export class ApplicantController {
  constructor(
    private createApplicantUseCase: CreateApplicantUseCase,
    private updateApplicantUseCase: UpdateApplicantUseCase,
    private deleteApplicantUseCase: DeleteApplicantUseCase,
  ) {}

  @MessagePattern('user.created')
  async handleApplicantCreated(@Payload() data: any) {
    try {
      await this.createApplicantUseCase.execute(data)
    } catch (error) {
      console.log(error)
    }
  }

  @MessagePattern('user.updated')
  async handleApplicantUpdated(@Payload() data: any) {
    try {
      await this.updateApplicantUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }

  @MessagePattern('user.deleted')
  async handleApplicantDeleted(@Payload() data: any) {
    try {
      await this.deleteApplicantUseCase.execute(data)
    } catch (error) {
      console.log(error)
    } 
  }
}
