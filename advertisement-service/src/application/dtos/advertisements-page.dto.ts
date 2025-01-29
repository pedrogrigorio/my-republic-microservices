import { AdvertisementResponseDto } from './advertisement-response.dto';

export class AdvertisementsPageDto {
  total: number;
  advertisements: AdvertisementResponseDto[];
}
