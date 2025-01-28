import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { firstValueFrom } from 'rxjs';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('UserService') private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AuthUserDto> {
    const { user } = await firstValueFrom(
      this.userService.validateUser({
        email,
        password,
      }),
    );

    return user;
  }
}
