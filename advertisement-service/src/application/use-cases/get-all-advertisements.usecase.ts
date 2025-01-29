import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllAdvertisementsUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(): Promise<AdvertisementResponseDto[]> {
    const advertisements = await this.advertisementRepository.findAll();

    const adsDto = advertisements.map((ad) => AdvertisementMapper.toDto(ad));

    return adsDto;
  }
}
