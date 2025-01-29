import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';
import { StorageService } from '../interfaces/storage.service.interface';

@Injectable()
export class DeleteAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private storageService: StorageService,
  ) {}

  async execute(advertisementId: number): Promise<void> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    if (advertisement.imgSrc) {
      await this.storageService.deleteFile(advertisement.imgSrc);
    }

    await this.advertisementRepository.deleteById(advertisement.id);
  }
}
