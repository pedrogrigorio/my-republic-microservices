import { Observable } from 'rxjs';

export interface AdvertisementService {
  getAllAdvertisements({}): Observable<any>;
}
