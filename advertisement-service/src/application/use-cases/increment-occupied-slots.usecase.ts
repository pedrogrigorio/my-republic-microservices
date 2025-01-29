import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncrementOccupiedSlotsUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
  ) {}

  async execute(advertisementId: number): Promise<void> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    advertisement.occupiedSlots += 1;

    if (advertisement.occupiedSlots === advertisement.totalSlots) {
      advertisement.isActive = false;

      // this.eventEmitter.emit('notification.create', {
      //   recipientId: advertisement.owner.id,
      //   type: NotificationType.ADVERTISEMENT_PAUSED,
      //   message: `Seu anúncio entitulado ${advertisement.title} foi pausado automaticamente devido a quantidade de vagas remanescentes.`,
      // });
    }

    await this.advertisementRepository.update(advertisement);
  }
}
