import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { StorageService } from '../interfaces/storage.service.interface';
import { UserRepository } from '../interfaces/user.repository.interface';
import { ClientKafka } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
    private readonly kafkaClient: ClientKafka,
  ) {}

  async execute(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    if (user.imgSrc) {
      await this.storageService.deleteFile(user.imgSrc);
    }

    await this.userRepository.deleteById(user.id);

    this.kafkaClient.emit('user.deleted', {
      id: userId,
    });
  }
}
