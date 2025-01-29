import { CityRepository } from '../interfaces/city.repository.interface';
import { Injectable } from '@nestjs/common';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class GetAllCitiesUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute() {
    const cities = await this.cityRepository.findAll();

    return cities.map((city) => CityMapper.toDto(city));
  }
}
