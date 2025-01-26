import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    return UserMapper.toDto(user);
  }
}
