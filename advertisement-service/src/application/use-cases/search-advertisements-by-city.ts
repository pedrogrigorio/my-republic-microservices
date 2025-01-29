import { CityNotFoundException } from '../../domain/exceptions/city-not-found.exception';
import { AdvertisementSearchResultDto } from '../dtos/advertisement-search-result.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { CityRepository } from '../interfaces/city.repository.interface';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Injectable } from '@nestjs/common';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class SearchAdvertisementsByCityUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private cityRepository: CityRepository,
  ) {}

  async execute(
    cityId: number,
    page: number = 1,
    pageSize: number = 12,
  ): Promise<AdvertisementSearchResultDto> {
    const city = await this.cityRepository.findById(cityId);
    
    if (!city) {
      throw new CityNotFoundException(`City with id ${cityId} not found`);
    }

    const searchResult = await this.advertisementRepository.findByCity(
      cityId,
      page,
      pageSize,
    );

    return {
      total: searchResult.total,
      city: CityMapper.toDto(city),
      advertisements: searchResult.advertisements.map((ad) =>
        AdvertisementMapper.toDto(ad),
      ),
    };
  }
}
