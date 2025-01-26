import { FileDto } from '../dtos/file.dto';

export abstract class StorageService {
  abstract upload(file: FileDto): Promise<string>;
  abstract deleteFile(fileUrl: string): Promise<void>;
}
