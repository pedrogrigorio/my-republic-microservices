import { State } from '../../domain/entities/state';

export abstract class StateRepository {
  abstract create(state: State): Promise<void>;
  abstract update(state: State): Promise<void>;
  abstract findAll(): Promise<State[]>;
  abstract findById(stateId: number): Promise<State>;
  abstract deleteById(stateId: number): Promise<void>;
}
