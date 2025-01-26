import { Gender } from 'src/domain/enums/gender';

export class SignUpDto {
  name: string;

  email: string;

  password: string;

  passwordConfirm: string;

  gender: Gender;
}
