import { HashingService } from '../../application/interfaces/hashing.service.interface';
import * as bcrypt from 'bcrypt';

export class BCryptHashingService implements HashingService {
  async hash(data: string, salt: number): Promise<string> {
    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedData);
  }
}
