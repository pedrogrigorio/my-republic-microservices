import { AdvertisementNotFoundException } from 'src/domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementDto } from '../dtos/advertisement.dto';
import { Advertisement } from 'src/domain/entities/advertisement';
import { Injectable } from '@nestjs/common';
import { State } from 'src/domain/entities/state';
import { City } from 'src/domain/entities/city';

@Injectable()
export class UpdateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
  ) {}

  async execute(advertisementDto: AdvertisementDto): Promise<void> {
    const existingAdvertisement = this.advertisementRepository.findById(advertisementDto.id);

    if (!existingAdvertisement) {
      throw new AdvertisementNotFoundException(`Advertisement with id ${advertisementDto.id} not found`)
    }

    const advertisement = new Advertisement({
      title: advertisementDto.title,
      imgSrc: advertisementDto.imgSrc,
      price: advertisementDto.price,
      isActive: advertisementDto.isActive,
      city: new City({
        name: advertisementDto.cityName,
      }),
      state: new State({
        uf: advertisementDto.stateUF,
      })
    }, advertisementDto.id);

    await this.advertisementRepository.update(advertisement);
  }
}
