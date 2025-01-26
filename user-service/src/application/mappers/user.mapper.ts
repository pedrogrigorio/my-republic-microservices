import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../../domain/entities/user';

export class UserMapper {
  static toDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      imgSrc: user.imgSrc,
    };
  }
}
