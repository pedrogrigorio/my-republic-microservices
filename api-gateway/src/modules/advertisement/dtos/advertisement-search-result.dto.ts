import { AdvertisementResponseDto } from './advertisement-response.dto';
import { CityResponseDto } from './city-response.dto';

export class AdvertisementSearchResultDto {
  total: number;
  city: CityResponseDto;
  advertisements: AdvertisementResponseDto[];
}
