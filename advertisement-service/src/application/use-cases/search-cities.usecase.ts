import { CityRepository } from '../interfaces/city.repository.interface';
import { Injectable } from '@nestjs/common';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class SearchCitiesUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute(searchTerm: string) {
    const cities = await this.cityRepository.findByName(searchTerm);

    return cities.map((city) => CityMapper.toDto(city));
  }
}
