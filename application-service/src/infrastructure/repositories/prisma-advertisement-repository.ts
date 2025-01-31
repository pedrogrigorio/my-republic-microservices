import { PrismaAdvertisementMapper } from '../mappers/prisma-advertisement.mapper';
import { AdvertisementRepository } from '../../application/interfaces/advertisement.repository.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAdvertisementRepository implements AdvertisementRepository {
  constructor(private prisma: PrismaService) {}

  async create(advertisement: Advertisement): Promise<void> {
    const data = PrismaAdvertisementMapper.toPrisma(advertisement);

    await this.prisma.advertisement.create({
      data,
    });
  }

  async update(advertisement: Advertisement): Promise<void> {
    const { id, ...data} = PrismaAdvertisementMapper.toPrisma(advertisement);

    await this.prisma.advertisement.update({
      data,
      where: {
        id,
      },
    });
  }

  async findById(advertisementId: number): Promise<Advertisement> {
    const ad = await this.prisma.advertisement.findUnique({
      where: {
        id: advertisementId,
      },
    });

    if (!ad) {
      return null;
    }

    return PrismaAdvertisementMapper.toDomain(ad);
  }

  async deleteById(advertisementId: number): Promise<void> {
    await this.prisma.advertisement.delete({
      where: {
        id: advertisementId,
      },
    });
  }
}
