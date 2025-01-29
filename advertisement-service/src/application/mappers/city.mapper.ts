import { CityResponseDto } from '../dtos/city-response.dto';
import { City } from '../../domain/entities/city';

export class CityMapper {
  static toDto(city: City): CityResponseDto {
    return {
      id: city.id,
      name: city.name,
      state: {
        id: city.state.id,
        uf: city.state.uf,
        name: city.state.name,
      },
    };
  }
}
