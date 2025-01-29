import { AmenityResponseDto } from './amenity-response.dto';
import { StateResponseDto } from './state-response.dto';
import { OwnerResponseDto } from './owner-response.dto';
import { RuleResponseDto } from './rule-response.dto';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from 'src/domain/enums/gender';

export class AdvertisementResponseDto {
  id: number;
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
  phone: string;
  isActive: boolean;
  imgSrc: string;
  city: {
    id: number;
    name: string;
    stateId: number;
  };
  state: StateResponseDto;
  owner: OwnerResponseDto;
  rules: RuleResponseDto[];
  amenities: AmenityResponseDto[];
}
