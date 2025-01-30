import { Owner } from 'src/domain/entities/owner';

export abstract class OwnerRepository {
  abstract findById(ownerId: number): Promise<Owner>;
  abstract create(owner: Owner): Promise<void>;
  abstract update(owner: Owner): Promise<void>;
  abstract deleteById(ownerId: number): Promise<void>;
}
