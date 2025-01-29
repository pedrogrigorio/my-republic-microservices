import { Amenity } from '../../domain/entities/amenity';

export abstract class AmenityRepository {
  abstract create(amenity: Amenity): Promise<void>;
  abstract findAll(): Promise<Amenity[]>;
  abstract findManyByTags(amenityTags: string[]): Promise<Amenity[]>;
}
