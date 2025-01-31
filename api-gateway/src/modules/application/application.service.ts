import { Observable } from 'rxjs';
import { CreateApplicationDto } from './dtos/create-application.dto';

export interface ApplicationService {
  getAllApplications({}): Observable<any>;
  getApplicationsByUser(data: { userId: number }): Observable<any>;
  getApplicationsByAdvertisement(data: {
    advertisementId: number;
  }): Observable<any>;
  apply(data: { userId: number; body: CreateApplicationDto }): Observable<any>;
  refuseApplication(data: { id: number }): Observable<any>;
  acceptApplication(data: { id: number }): Observable<any>;
  deleteApplication(data: { id: number }): Observable<any>;
}
