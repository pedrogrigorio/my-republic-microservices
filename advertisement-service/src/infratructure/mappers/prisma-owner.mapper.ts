import { Owner as RawOwner } from '@prisma/client';
import { Owner } from 'src/domain/entities/owner';

export class PrismaOwnerMapper {
  static toPrisma(owner: Owner): RawOwner {
    return {
      id: owner.id,
      name: owner.name,
    };
  }

  static toDomain(raw: RawOwner): Owner {
    return new Owner(
      {
        name: raw.name,
      },
      raw.id,
    );
  }
}
