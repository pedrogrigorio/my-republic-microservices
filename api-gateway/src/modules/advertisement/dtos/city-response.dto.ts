import { StateResponseDto } from './state-response.dto';

export class CityResponseDto {
  id: number;
  name: string;
  state: StateResponseDto;
}
