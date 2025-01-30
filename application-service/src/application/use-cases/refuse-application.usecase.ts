import { ApplicationStatus } from '../../domain/enums/application-status';
import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefuseApplicationUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(applicationId: number) {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new ApplicationNotFoundException(
        `Application with id ${applicationId} not found`,
      );
    }

    application.status = ApplicationStatus.REFUSED;

    await this.applicationRepository.update(application);
  }
}
