import { PayloadDto } from '../dtos/payload.interface';

export abstract class TokenService {
  abstract generateToken(payload: PayloadDto): string;
}
