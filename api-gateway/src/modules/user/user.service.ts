import { Observable } from 'rxjs';
import { FileDto } from './dtos/file.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UpdateEmailDto } from './dtos/update-email.dto';
import { UpdateNameDto } from './dtos/update-name.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';

export interface UserService {
  signUp(data: SignUpDto): Observable<any>;
  getAllUsers({}): Observable<any>;
  getUserById(data: { id: number }): Observable<any>;
  updateName(data: { body: UpdateNameDto; id: number }): Observable<any>;
  updateEmail(data: { body: UpdateEmailDto; id: number }): Observable<any>;
  updatePassword(data: {
    body: UpdatePasswordDto;
    id: number;
  }): Observable<any>;
  updatePhoto(data: { file: FileDto; id: number }): Observable<any>;
  deleteUser(data: { id: number }): Observable<any>;
  validateUser(data: { email: string; password: string }): Observable<any>;
}
