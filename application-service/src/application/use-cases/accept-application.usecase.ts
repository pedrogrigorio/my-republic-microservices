import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { AdvertisementPausedException } from '../../domain/exceptions/advertisement-paused.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationStatus } from '../../domain/enums/application-status';
// import { NotificationType } from '@src/modules/notification/domain/enums/notification-type';
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

    // this.eventEmitter.emit('notification.create', {
    //   type: NotificationType.APPLICATION_ACCEPTED,
    //   recipientId: application.applicantId,
    //   message: `Você foi aceito na república ${application.advertisement.title}`,
    // });

    this.kafkaClient.emit('application.accepted', {
      id: application.id,
      advertisementId: application.advertisementId,
      applicantId: application.applicantId,
    });

    await this.applicationRepository.update(application);
  }
}
