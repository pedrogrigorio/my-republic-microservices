import { Amenity as RawAmenity } from '@prisma/client';
import { Amenity } from 'src/domain/entities/amenity';

export class PrismaAmenityMapper {
  static toPrisma(amenity: Amenity): RawAmenity {
    return {
      id: amenity.id,
      tag: amenity.tag,
      value: amenity.value,
    };
  }

  static toDomain(raw: RawAmenity): Amenity {
    return new Amenity(
      {
        tag: raw.tag,
        value: raw.value,
      },
      raw.id,
    );
  }
}
