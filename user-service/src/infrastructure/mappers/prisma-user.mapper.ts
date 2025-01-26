import { User as RawUser } from '@prisma/client';
import { User } from '../../domain/entities/user';
import { Gender } from 'src/domain/enums/gender';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      gender: user.gender,
      imgSrc: user.imgSrc,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        gender: raw.gender as Gender,
        imgSrc: raw.imgSrc,
      },
      raw.id,
    );
  }
}
