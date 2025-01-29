import { AmenityResponseDto } from '../dtos/amenity-response.dto';
import { Amenity } from '../../domain/entities/amenity';

export class AmenityMapper {
  static toDto(amenity: Amenity): AmenityResponseDto {
    return {
      id: amenity.id,
      tag: amenity.tag,
      value: amenity.value,
    };
  }
}
