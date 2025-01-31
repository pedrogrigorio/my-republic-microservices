import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementDto } from '../dtos/advertisement.dto';
import { Advertisement } from 'src/domain/entities/advertisement';
import { Injectable } from '@nestjs/common';
import { City } from 'src/domain/entities/city';
import { State } from 'src/domain/entities/state';

@Injectable()
export class CreateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
  ) {}

  async execute(advertisementDto: AdvertisementDto): Promise<void> {
    console.log('entrou no use case')
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

    console.log(advertisement)
    await this.advertisementRepository.create(advertisement);
  }
}
