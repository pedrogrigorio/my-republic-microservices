import { State } from '../../domain/entities/state';
import { City } from '../../domain/entities/city';

export abstract class LocaleService {
  abstract getCities(): Promise<City[]>;
  abstract getStates(): Promise<State[]>;
}
