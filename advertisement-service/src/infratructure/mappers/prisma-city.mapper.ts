import { City as RawCity, State as RawState } from '@prisma/client';
import { City } from '../../domain/entities/city';
import { PrismaStateMapper } from './prisma-state.mapper';

type PrismaCity = RawCity & {
  state: RawState;
};

export class PrismaCityMapper {
  static toPrisma(city: City): RawCity {
    return {
      id: city.id,
      name: city.name,
      stateId: city.stateId,
    };
  }

  static toDomain(raw: PrismaCity): City {
    return new City(
      {
        name: raw.name,
        stateId: raw.stateId,
        state: PrismaStateMapper.toDomain(raw.state),
      },
      raw.id,
    );
  }
}
