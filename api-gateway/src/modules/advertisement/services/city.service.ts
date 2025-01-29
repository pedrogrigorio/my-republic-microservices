import { Observable } from 'rxjs';

export interface CityService {
  getAllCities({}): Observable<any>;
  getCitiesByState(data: { stateId: number }): Observable<any>;
  searchCities(data: { term: string }): Observable<any>;
}
