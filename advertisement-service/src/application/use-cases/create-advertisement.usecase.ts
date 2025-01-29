import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { AmenityRepository } from '../interfaces/amenity.repository.interface';
import { RuleRepository } from '../interfaces/rule.repository.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';
import { StorageService } from '../interfaces/storage.service.interface';
import { FileDto } from '../dtos/file.dto';

@Injectable()
export class CreateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private amenityRepository: AmenityRepository,
    private ruleRepository: RuleRepository,
    private storageService: StorageService,
  ) {}

  async execute(
    file: FileDto,
    createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    const ruleTags = Object.keys(createAdvertisementDto.rules).filter(
      (rule) => createAdvertisementDto.rules[rule],
    );

    const amenityTags = Object.keys(createAdvertisementDto.amenities).filter(
      (amenity) => createAdvertisementDto.amenities[amenity],
    );

    const rules = await this.ruleRepository.findManyByTags(ruleTags);
    const amenities = await this.amenityRepository.findManyByTags(amenityTags);
    const imgSrc = await this.storageService.upload(file);

    const advertisement = new Advertisement({
      ...createAdvertisementDto,
      imgSrc,
      amenities,
      rules,
    });

    const createdAdvertisement =
      await this.advertisementRepository.create(advertisement);

    return AdvertisementMapper.toDto(createdAdvertisement);
  }
}
