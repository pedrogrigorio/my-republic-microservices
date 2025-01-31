import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { AmenityRepository } from '../interfaces/amenity.repository.interface';
import { RuleRepository } from '../interfaces/rule.repository.interface';
import { StorageService } from '../interfaces/storage.service.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { ClientKafka } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { FileDto } from '../dtos/file.dto';

@Injectable()
export class CreateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private amenityRepository: AmenityRepository,
    private ruleRepository: RuleRepository,
    private storageService: StorageService,
    private readonly kafkaClient: ClientKafka,
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

    
    this.kafkaClient.emit('advertisement.created', {
      id: createdAdvertisement.id,
      title: createdAdvertisement.title,
      imgSrc: createdAdvertisement.imgSrc,
      price : createdAdvertisement.price,
      cityName : createdAdvertisement.city.name,
      stateUF: createdAdvertisement.state.uf,
      isActive: createdAdvertisement.isActive,
    });
    
    return AdvertisementMapper.toDto(createdAdvertisement);
  }
}
