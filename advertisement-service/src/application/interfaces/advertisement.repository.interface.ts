import { Advertisement } from '../../domain/entities/advertisement';
import { AdvertisementSearchResult } from '../../domain/entities/advertisement-search-result';

export abstract class AdvertisementRepository {
  abstract create(advertisement: Advertisement): Promise<Advertisement>;
  abstract update(advertisement: Advertisement): Promise<Advertisement>;
  abstract findAll(): Promise<Advertisement[]>;
  abstract findById(advertisementId: number): Promise<Advertisement>;
  abstract findByOwner(
    ownerId: number,
    page: number,
    pageSize: number,
  ): Promise<AdvertisementSearchResult>;

  abstract findByCity(
    cityId: number,
    page: number,
    pageSize: number,
  ): Promise<AdvertisementSearchResult>;

  abstract deleteById(advertisementId: number): Promise<void>;
}
