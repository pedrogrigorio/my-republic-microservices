import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserRepository } from '../interfaces/user.repository.interface';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(updateEmailDto: UpdateEmailDto, userId: number): Promise<void> {
    const { newEmail } = updateEmailDto;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    const existingUser = await this.userRepository.findByEmail(newEmail);

    if (existingUser) {
      throw new EmailAlreadyExistsException(
        `The email ${newEmail} already exists.`,
      );
    }

    user.email = newEmail;

    await this.userRepository.update(user);
  }
}
