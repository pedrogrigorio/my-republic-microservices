import { AdvertisementNotFoundException } from 'src/domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
  ) {}

  async execute(advertisementDto: { id: number }): Promise<void> {
    const existingAdvertisement = this.advertisementRepository.findById(advertisementDto.id);
    
    if (!existingAdvertisement) {
      throw new AdvertisementNotFoundException(`Advertisement with id ${advertisementDto.id} not found`)
    }

    await this.advertisementRepository.deleteById(advertisementDto.id);
  }
}
