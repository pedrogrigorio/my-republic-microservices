import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../../application/dtos/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadDto): Promise<AuthUserDto> {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      gender: payload.gender,
      imgSrc: payload.imgSrc,
    };
  }
}
