import { PrismaAmenityMapper } from './prisma-amenity.mapper';
import { PrismaStateMapper } from './prisma-state.mapper';
import { PrismaRuleMapper } from './prisma-rule.mapper';
import { Advertisement } from '../../domain/entities/advertisement';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Owner } from '../../domain/entities/owner';
import { City } from '../../domain/entities/city';
import {
  Advertisement as RawAdvertisement,
  Amenity as RawAmenity,
  State as RawState,
  Owner as RawOwner,
  City as RawCity,
  Rule as RawRule,
} from '@prisma/client';
import { Gender } from 'src/domain/enums/gender';

type PrismaAdvertisementResponse = RawAdvertisement & {
  owner: RawOwner;
  state: RawState;
  city: RawCity;
  rules: RawRule[];
  amenities: RawAmenity[];
};

type PrismaAdvertisementRequest = RawAdvertisement & {
  rules: RawRule[];
  amenities: RawAmenity[];
};

export class PrismaAdvertisementMapper {
  static toPrisma(advertisement: Advertisement): PrismaAdvertisementRequest {
    return {
      id: advertisement.id,
      title: advertisement.title,
      price: advertisement.price,
      description: advertisement.description,
      genderPreference: advertisement.genderPreference,
      allowOppositeGender: advertisement.allowOppositeGender,
      totalSlots: advertisement.totalSlots,
      occupiedSlots: advertisement.occupiedSlots,
      bedroomType: advertisement.bedroomType,
      numBathroom: advertisement.numBathroom,
      numBedroom: advertisement.numBedroom,
      hasPet: advertisement.hasPet,
      ownerId: advertisement.ownerId,
      cityId: advertisement.cityId,
      phone: advertisement.phone,
      stateId: advertisement.stateId,
      isActive: advertisement.isActive,
      imgSrc: advertisement.imgSrc,
      rules: advertisement.rules.map((rule) => PrismaRuleMapper.toPrisma(rule)),
      amenities: advertisement.amenities.map((amenity) =>
        PrismaAmenityMapper.toPrisma(amenity),
      ),
    };
  }

  static toDomain(raw: PrismaAdvertisementResponse): Advertisement {
    return new Advertisement(
      {
        title: raw.title,
        price: raw.price,
        description: raw.description,
        genderPreference: raw.genderPreference as Gender,
        allowOppositeGender: raw.allowOppositeGender,
        totalSlots: raw.totalSlots,
        occupiedSlots: raw.occupiedSlots,
        bedroomType: raw.bedroomType as BedroomType,
        numBathroom: raw.numBathroom,
        numBedroom: raw.numBedroom,
        hasPet: raw.hasPet,
        isActive: raw.isActive,
        imgSrc: raw.imgSrc,
        cityId: raw.cityId,
        stateId: raw.stateId,
        ownerId: raw.ownerId,
        phone: raw.phone,
        city: new City(
          {
            name: raw.city.name,
            stateId: raw.city.stateId,
          },
          raw.city.id,
        ),
        state: PrismaStateMapper.toDomain(raw.state),
        owner: new Owner(
          {
            name: raw.owner.name,
          },
          raw.owner.id,
        ),
        rules: raw.rules.map((rule) => PrismaRuleMapper.toDomain(rule)),
        amenities: raw.amenities.map((amenity) =>
          PrismaAmenityMapper.toDomain(amenity),
        ),
      },
      raw.id,
    );
  }
}
