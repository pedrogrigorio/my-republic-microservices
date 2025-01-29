import { BedroomType } from 'src/core/enums/bedroomtype';
import { Gender } from 'src/core/enums/gender';
import { AmenitiesDto } from './amenities.dto';
import { RulesDto } from './rules.dto';

export class CreateAdvertisementDto {
  title: string;
  description: string;
  price: number;
  genderPreference: Gender;
  allowOppositeGender: boolean;
  totalSlots: number;
  occupiedSlots: number;
  bedroomType: BedroomType;
  numBedroom: number;
  numBathroom: number;
  hasPet: boolean;
  ownerId: number;
  cityId: number;
  stateId: number;
  phone: string;
  amenities: AmenitiesDto;
  rules: RulesDto;
}
