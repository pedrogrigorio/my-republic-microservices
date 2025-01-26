import { GetUserByEmailUseCase } from './get-user-by-email.usecase';
import { UserResponseDto } from '../dtos/user-response.dto';
import { ValidateUserDto } from '../dtos/validate-user.dto';
import { HashingService } from '../interfaces/hashing.service.interface';
import { AuthException } from 'src/domain/exceptions/auth.exception';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private hashingService: HashingService,
  ) {}

  async execute(validateUserDto: ValidateUserDto): Promise<UserResponseDto> {
    const { email, password } = validateUserDto;

    const user = await this.getUserByEmailUseCase.execute(email);

    if (user) {
      const isPasswordValid = await this.hashingService.compare(
        password,
        user.password,
      );

      if (isPasswordValid) {
        return UserMapper.toDto(user);
      }
    }

    throw new AuthException('Email address or password provided is incorrect.');
  }
}
