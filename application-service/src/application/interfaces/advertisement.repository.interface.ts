import { Advertisement } from '../../domain/entities/advertisement';

export abstract class AdvertisementRepository {
  abstract create(advertisement: Advertisement): Promise<void>;
  abstract update(advertisement: Advertisement): Promise<void>;
  abstract findById(advertisementId: number): Promise<Advertisement>;
  abstract deleteById(advertisementId: number): Promise<void>;
}
