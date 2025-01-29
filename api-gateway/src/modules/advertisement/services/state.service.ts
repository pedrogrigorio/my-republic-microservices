import { Observable } from 'rxjs';

export interface StateService {
  getAllStates({}): Observable<any>;
}
