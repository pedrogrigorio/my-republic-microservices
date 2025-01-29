import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAdvertisementByIdUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(advertisementId: number): Promise<AdvertisementResponseDto> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    return AdvertisementMapper.toDto(advertisement);
  }
}
