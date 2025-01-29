import { PrismaAdvertisementMapper } from '../mappers/prisma-advertisement.mapper';
import { AdvertisementSearchResult } from '../../domain/entities/advertisement-search-result';
import { AdvertisementRepository } from '../../application/interfaces/advertisement.repository.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PrismaAdvertisementRepository implements AdvertisementRepository {
  constructor(private prisma: PrismaService) {}

  async create(advertisement: Advertisement): Promise<Advertisement> {
    const { amenities, rules, ...data } =
      PrismaAdvertisementMapper.toPrisma(advertisement);

    const createdAd = await this.prisma.advertisement.create({
      data: {
        ...data,
        amenities: {
          connect: amenities.map((amenity) => ({
            id: amenity.id,
          })),
        },
        rules: {
          connect: rules.map((rule) => ({
            id: rule.id,
          })),
        },
      },
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
    });

    return PrismaAdvertisementMapper.toDomain(createdAd);
  }

  async update(advertisement: Advertisement): Promise<Advertisement> {
    const { amenities, rules, id, ...data } =
      PrismaAdvertisementMapper.toPrisma(advertisement);

    const updatedAd = await this.prisma.advertisement.update({
      data: {
        ...data,
        amenities: {
          set: amenities.map((amenity) => ({
            id: amenity.id,
          })),
        },
        rules: {
          set: rules.map((rule) => ({
            id: rule.id,
          })),
        },
      },
      where: {
        id,
      },
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
    });

    return PrismaAdvertisementMapper.toDomain(updatedAd);
  }

  async findAll(): Promise<Advertisement[]> {
    const advertisements = await this.prisma.advertisement.findMany({
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
    });

    return advertisements.map((ad) => PrismaAdvertisementMapper.toDomain(ad));
  }

  async findById(advertisementId: number): Promise<Advertisement> {
    const ad = await this.prisma.advertisement.findUnique({
      where: {
        id: advertisementId,
      },
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
    });

    if (!ad) {
      return null;
    }

    return PrismaAdvertisementMapper.toDomain(ad);
  }

  async findByOwner(
    ownerId: number,
    page: number,
    pageSize: number,
  ): Promise<AdvertisementSearchResult> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.advertisement.count({
      where: {
        ownerId,
      },
    });

    const advertisements = await this.prisma.advertisement.findMany({
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
      where: {
        ownerId,
      },
      skip: skip,
      take: pageSize,
    });

    const adsDto = advertisements.map((ad) =>
      PrismaAdvertisementMapper.toDomain(ad),
    );

    const myAds = new AdvertisementSearchResult({
      total: totalItems,
      advertisements: adsDto,
    });

    return myAds;
  }

  async findByCity(
    cityId: number,
    page: number,
    pageSize: number,
  ): Promise<AdvertisementSearchResult> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.advertisement.count({
      where: {
        cityId,
      },
    });

    const advertisements = await this.prisma.advertisement.findMany({
      include: {
        owner: true,
        state: true,
        city: true,
        amenities: true,
        rules: true,
      },
      where: {
        cityId,
      },
      skip: skip,
      take: pageSize,
    });

    const adsDto = advertisements.map((ad) =>
      PrismaAdvertisementMapper.toDomain(ad),
    );

    const searchResult = new AdvertisementSearchResult({
      total: totalItems,
      advertisements: adsDto,
    });

    return searchResult;
  }

  async deleteById(advertisementId: number): Promise<void> {
    await this.prisma.advertisement.delete({
      where: {
        id: advertisementId,
      },
    });
  }
}
