import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementsPageDto } from '../dtos/advertisements-page.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAdvertisementsByOwnerUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(
    ownerId: number,
    page: number = 1,
    pageSize: number = 6,
  ): Promise<AdvertisementsPageDto> {
    const advertisementPage = await this.advertisementRepository.findByOwner(
      ownerId,
      page,
      pageSize,
    );

    return {
      total: advertisementPage.total,
      advertisements: advertisementPage.advertisements.map((ad) =>
        AdvertisementMapper.toDto(ad),
      ),
    };
  }
}
