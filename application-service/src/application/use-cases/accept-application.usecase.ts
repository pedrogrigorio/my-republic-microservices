import { IncrementOccupiedSlotsUseCase } from '@src/modules/advertisement/application/use-cases/increment-occupied-slots.usecase';
import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { AdvertisementPausedException } from '../../domain/exceptions/advertisement-paused.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationStatus } from '../../domain/enums/application-status';
import { NotificationType } from '@src/modules/notification/domain/enums/notification-type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private eventEmitter: EventEmitter2,
    private applicationRepository: ApplicationRepository,
    private incrementOccupiedSlotsUseCase: IncrementOccupiedSlotsUseCase,
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

    this.eventEmitter.emit('notification.create', {
      type: NotificationType.APPLICATION_ACCEPTED,
      recipientId: application.applicantId,
      message: `Você foi aceito na república ${application.advertisement.title}`,
    });

    await this.incrementOccupiedSlotsUseCase.execute(
      application.advertisement.id,
    );

    await this.applicationRepository.update(application);
  }
}
