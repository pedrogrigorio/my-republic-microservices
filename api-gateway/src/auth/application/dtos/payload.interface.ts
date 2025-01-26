import { Gender } from 'src/core/enums/gender';

export class PayloadDto {
  sub: number;
  name: string;
  email: string;
  gender: Gender;
  imgSrc?: string;
}
