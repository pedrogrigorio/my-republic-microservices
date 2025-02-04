import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { AdvertisementPausedException } from '../../domain/exceptions/advertisement-paused.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationStatus } from '../../domain/enums/application-status';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private applicationRepository: ApplicationRepository, 
    private readonly kafkaClient: ClientKafka,
  ) {}

  async execute(applicationId: number) {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new ApplicationNotFoundException(
        `Application with id ${applicationId} not found`,
      );
    }

    if (application.advertisement.isActive === false) {
      throw new AdvertisementPausedException(`Advertisement paused`);
    }

    application.status = ApplicationStatus.ACCEPTED;

    this.kafkaClient.emit('application.accepted', {
      id: application.id,
      advertisementId: application.advertisementId,
      applicantId: application.applicantId,
      advertisementTitle: application.advertisement.title,
    });

    await this.applicationRepository.update(application);
  }
}
