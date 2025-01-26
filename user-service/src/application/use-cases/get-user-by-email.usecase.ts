import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
