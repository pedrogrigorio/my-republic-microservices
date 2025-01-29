import { City } from '../../domain/entities/city';

export abstract class CityRepository {
  abstract create(city: City): Promise<void>;
  abstract update(city: City): Promise<void>;
  abstract findAll(): Promise<City[]>;
  abstract findById(cityId: number): Promise<City>;
  abstract findByStateId(stateId: number): Promise<City[]>;
  abstract findByName(name: string): Promise<City[]>;
  abstract deleteById(cityId: number): Promise<void>;
}
