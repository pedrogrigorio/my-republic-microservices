import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteApplicationUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(applicationId: number) {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new ApplicationNotFoundException(
        `Application with id ${applicationId} not found`,
      );
    }

    await this.applicationRepository.deleteById(applicationId);
  }
}
