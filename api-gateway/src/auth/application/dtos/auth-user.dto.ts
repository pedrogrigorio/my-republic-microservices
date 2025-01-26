import { Gender } from 'src/core/enums/gender';

export class AuthUserDto {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  imgSrc?: string;
}
