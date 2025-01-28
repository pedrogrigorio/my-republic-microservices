import { AuthResponseDto } from '../dtos/auth-response.dto';
import { TokenService } from '../interfaces/token.service.interface';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { PayloadDto } from '../dtos/payload.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  constructor(private tokenService: TokenService) {}

  async execute(authUserDto: AuthUserDto): Promise<AuthResponseDto> {
    console.log('Chamou o login use case e esses são os dados: ');
    console.log(authUserDto);
    const payload: PayloadDto = {
      sub: authUserDto.id,
      name: authUserDto.name,
      email: authUserDto.email,
      gender: authUserDto.gender,
      imgSrc: authUserDto.imgSrc,
    };

    console.log('payload: ', payload);

    const token = this.tokenService.generateToken(payload);

    return { user: authUserDto, access_token: token };
  }
}
