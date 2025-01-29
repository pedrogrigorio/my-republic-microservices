import { CityRepository } from '../interfaces/city.repository.interface';
import { Injectable } from '@nestjs/common';
import { CityMapper } from '../mappers/city.mapper';

@Injectable()
export class GetCitiesByStateIdUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute(stateId: number) {
    const cities = await this.cityRepository.findByStateId(stateId);

    return cities.map((city) => CityMapper.toDto(city));
  }
}
