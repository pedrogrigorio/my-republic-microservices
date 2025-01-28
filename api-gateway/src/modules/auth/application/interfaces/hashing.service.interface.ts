export abstract class HashingService {
  abstract hash(data: string, salt: number): Promise<string>;
  abstract compare(data: string, hashedData: string): Promise<boolean>;
}
