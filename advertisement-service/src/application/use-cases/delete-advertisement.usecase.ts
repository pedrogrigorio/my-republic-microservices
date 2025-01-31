import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { StorageService } from '../interfaces/storage.service.interface';
import { ClientKafka } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private storageService: StorageService,
    private readonly kafkaClient: ClientKafka,
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

    this.kafkaClient.emit('advertisement.deleted', {
      id: advertisementId,
    });
  }
}
