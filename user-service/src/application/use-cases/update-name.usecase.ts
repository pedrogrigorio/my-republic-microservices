import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserRepository } from '../interfaces/user.repository.interface';
import { UpdateNameDto } from '../dtos/update-name.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(updateNameDto: UpdateNameDto, userId: number): Promise<void> {
    const { newName } = updateNameDto;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    user.name = newName;

    await this.userRepository.update(user);
  }
}
