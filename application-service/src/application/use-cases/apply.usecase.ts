import { AdvertisementNotFoundException } from '@src/modules/advertisement/domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '@src/modules/advertisement/application/interfaces/advertisement.repository.interface';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { CreateApplicationDto } from '../dtos/create-application.dto';
import { Application } from '../../domain/entities/application';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplyUseCase {
  constructor(
    private applicationRepository: ApplicationRepository,
    private advertisementRepository: AdvertisementRepository,
  ) {}

  async execute(
    userId: number,
    createApplicationDto: CreateApplicationDto,
  ): Promise<void> {
    const { advertisementId, message } = createApplicationDto;

    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    const application = new Application({
      advertisementId,
      message,
      applicantId: userId,
    });

    await this.applicationRepository.create(application);
  }
}
