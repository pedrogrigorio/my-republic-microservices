import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/application/dtos/auth-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUserDto => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
