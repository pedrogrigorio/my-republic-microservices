import { UserResponseDto } from '../dtos/user-response.dto';
import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();

    const usersDto = users.map((user) => UserMapper.toDto(user));

    return usersDto;
  }
}
