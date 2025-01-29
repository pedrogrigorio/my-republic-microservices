import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PauseAdvertisementUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(advertisementId: number): Promise<void> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    advertisement.isActive = false;

    await this.advertisementRepository.update(advertisement);
  }
}
