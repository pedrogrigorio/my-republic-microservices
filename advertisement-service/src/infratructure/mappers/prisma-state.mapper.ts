import { State as RawState } from '@prisma/client';
import { State } from '../../domain/entities/state';

export class PrismaStateMapper {
  static toPrisma(state: State): RawState {
    return {
      id: state.id,
      uf: state.name,
      name: state.name,
    };
  }

  static toDomain(raw: RawState): State {
    return new State(
      {
        uf: raw.uf,
        name: raw.name,
      },
      raw.id,
    );
  }
}
