import { Observable } from 'rxjs';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../dtos/update-advertisement.dto';
import { FileDto } from '../dtos/file.dto';

export interface AdvertisementService {
  getAllAdvertisements({}): Observable<any>;

  searchAdvertisementsByCity(data: {
    cityId: number;
    pageNumber: number;
    pageSizeNumber: number;
  }): Observable<any>;

  getAdvertisementByOwner(data: {
    ownerId: number;
    pageNumber: number;
    pageSizeNumber: number;
  }): Observable<any>;

  getAdvertisementById(data: { id: number }): Observable<any>;

  createAdvertisement(data: {
    file: FileDto;
    createAdvertisementDto: CreateAdvertisementDto;
  }): Observable<any>;

  updateAdvertisement(data: {
    id: number;
    file: FileDto;
    updateAdvertisementDto: UpdateAdvertisementDto;
  }): Observable<any>;

  pauseAdvertisement(data: { id: number }): Observable<any>;
  deleteAdvertisement(data: { id: number }): Observable<any>;
}
