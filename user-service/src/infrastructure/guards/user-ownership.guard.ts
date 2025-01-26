import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserOwnership implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authUser = req.user;
    const userIdFromParams = parseInt(req.params.id);

    if (authUser.id !== userIdFromParams) {
      throw new ForbiddenException(
        'You are not allowed to access this user profile.',
      );
    }

    return true;
  }
}
