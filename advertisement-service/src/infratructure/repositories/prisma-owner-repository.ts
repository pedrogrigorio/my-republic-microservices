import { PrismaOwnerMapper } from '../mappers/prisma-owner.mapper';
import { OwnerRepository } from 'src/application/interfaces/owner.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Owner } from 'src/domain/entities/owner';

@Injectable()
export class PrismaOwnerRepository implements OwnerRepository {
  constructor(private prisma: PrismaService) {}

  async findById(ownerId: number): Promise<Owner> {
    const owner = await this.prisma.owner.findUnique({
      where: {
        id: ownerId,
      },
    });
    
    if (!owner) {
      return null;
    }
    
    return PrismaOwnerMapper.toDomain(owner);
  }

  async create(owner: Owner): Promise<void> {
    await this.prisma.owner.create({
      data: {
        id: owner.id,
        name: owner.name,
      },
    });
  }

  async update(owner: Owner): Promise<void> {
    await this.prisma.owner.update({
      data: {
        name: owner.name,
      },
      where: {
        id: owner.id,
      },
    });
  }

  async deleteById(ownerId: number): Promise<void> {
    await this.prisma.owner.delete({
      where: {
        id: ownerId,
      },
    });
  }
}
