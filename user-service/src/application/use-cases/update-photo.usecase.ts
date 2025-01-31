import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserResponseDto } from '../dtos/user-response.dto';
import { StorageService } from '../interfaces/storage.service.interface';
import { UserRepository } from '../interfaces/user.repository.interface';
import { ClientKafka } from '@nestjs/microservices';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { FileDto } from '../dtos/file.dto';

@Injectable()
export class UpdatePhotoUseCase {
  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
    private readonly kafkaClient: ClientKafka,
  ) {}

  async execute(file: FileDto, userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    if (user.imgSrc) {
      await this.storageService.deleteFile(user.imgSrc);
    }

    const imgSrc = await this.storageService.upload(file);

    user.imgSrc = imgSrc;

    const updatedUser = await this.userRepository.update(user);

    this.kafkaClient.emit('user.updated', {
      id: updatedUser.id,
      name: updatedUser.name,
      imgSrc: updatedUser.imgSrc,
    });

    return UserMapper.toDto(updatedUser);
  }
}
