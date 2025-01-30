import { OwnerNotFoundException } from 'src/domain/exceptions/owner-not-found.exception';
import { OwnerRepository } from '../interfaces/owner.repository.interface';
import { Injectable } from '@nestjs/common';
import { Owner } from 'src/domain/entities/owner';

@Injectable()
export class UpdateOwnerUseCase {
  constructor(
    private ownerRepository: OwnerRepository,
  ) {}

  async execute(ownerDto: {id: number; name: string}): Promise<void> {
    const existingOwner = this.ownerRepository.findById(ownerDto.id);

    if (!existingOwner) {
      throw new OwnerNotFoundException(`Owner with id ${ownerDto.id} not found`)
    }

    const owner = new Owner({ name: ownerDto.name }, ownerDto.id);

    await this.ownerRepository.update(owner);
  }
}
