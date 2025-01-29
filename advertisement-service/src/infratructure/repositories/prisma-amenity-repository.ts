import { AmenityRepository } from '../../application/interfaces/amenity.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Amenity } from 'src/domain/entities/amenity';
import { PrismaAmenityMapper } from '../mappers/prisma-amenity.mapper';

@Injectable()
export class PrismaAmenityRepository implements AmenityRepository {
  constructor(private prisma: PrismaService) {}

  async create(amenity: Amenity): Promise<void> {
    const raw = PrismaAmenityMapper.toPrisma(amenity);

    await this.prisma.amenity.create({
      data: {
        tag: raw.tag,
        value: raw.value,
      },
    });
  }

  async findAll(): Promise<Amenity[]> {
    const amenity = await this.prisma.amenity.findMany();

    return amenity.map((amenity) => PrismaAmenityMapper.toDomain(amenity));
  }

  async findManyByTags(amenityTags: string[]): Promise<Amenity[]> {
    const amenities = await this.prisma.amenity.findMany({
      where: {
        tag: {
          in: amenityTags,
        },
      },
    });

    if (amenities.length === 0) return [];

    return amenities.map((amenity) => PrismaAmenityMapper.toDomain(amenity));
  }
}
