import { Advertisement } from '../../domain/entities/advertisement';
import { State } from 'src/domain/entities/state';
import { City } from '../../domain/entities/city';
import {
  Advertisement as RawAdvertisement,
} from '@prisma/client';

export class PrismaAdvertisementMapper {
  static toPrisma(advertisement: Advertisement): RawAdvertisement {
    return {
      id: advertisement.id,
      title: advertisement.title,
      price: advertisement.price,
      isActive: advertisement.isActive,
      imgSrc: advertisement.imgSrc,
      cityName: advertisement.city.name,
      stateUF: advertisement.state.uf,
    };
  }

  static toDomain(raw: RawAdvertisement): Advertisement {
    return new Advertisement(
      {
        title: raw.title,
        price: raw.price,
        isActive: raw.isActive,
        imgSrc: raw.imgSrc,
        city: new City(
          {
            name: raw.cityName,
          },
        ),
        state: new State(
          {
            uf: raw.stateUF
          }
        )
      },
      raw.id,
    );
  }
}
