import { OwnerNotFoundException } from 'src/domain/exceptions/owner-not-found.exception';
import { OwnerRepository } from '../interfaces/owner.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteOwnerUseCase {
  constructor(
    private ownerRepository: OwnerRepository,
  ) {}

  async execute(ownerDto: { id: number }): Promise<void> {
    const existingOwner = this.ownerRepository.findById(ownerDto.id);

    if (!existingOwner) {
      throw new OwnerNotFoundException(`Owner with id ${ownerDto.id} not found`)
    }

    await this.ownerRepository.deleteById(ownerDto.id);
  }
}
