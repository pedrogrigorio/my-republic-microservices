import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { FileDto } from '../dtos/file.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { StorageService } from '../interfaces/storage.service.interface';
import { UserRepository } from '../interfaces/user.repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePhotoUseCase {
  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
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

    return UserMapper.toDto(updatedUser);
  }
}
