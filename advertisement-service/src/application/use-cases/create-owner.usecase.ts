import { OwnerRepository } from '../interfaces/owner.repository.interface';
import { Injectable } from '@nestjs/common';
import { Owner } from 'src/domain/entities/owner';

@Injectable()
export class CreateOwnerUseCase {
  constructor(
    private ownerRepository: OwnerRepository,
  ) {}

  async execute(ownerDto: {id: number; name: string}): Promise<void> {
    const owner = new Owner({ name: ownerDto.name }, ownerDto.id);

    await this.ownerRepository.create(owner);
  }
}
