import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';
import { InvalidPasswordException } from '../../domain/exceptions/invalid-password.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { updatePasswordDto } from '../dtos/update-password.dto';
import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { HashingService } from '../interfaces/hashing.service.interface';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashingService: HashingService,
  ) {}

  async execute(
    updatePasswordDto: updatePasswordDto,
    userId: number,
  ): Promise<void> {
    const { oldPassword, newPassword, confirmNewPassword } = updatePasswordDto;

    if (newPassword !== confirmNewPassword) {
      throw new PasswordNotMatchException('Passwords do not match');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    const oldPasswordIsValid = await this.hashingService.compare(
      oldPassword,
      user.password,
    );

    if (!oldPasswordIsValid) {
      throw new InvalidPasswordException('Old password is invalid');
    }

    user.password = await this.hashingService.hash(newPassword, 10);

    await this.userRepository.update(user);
  }
}
