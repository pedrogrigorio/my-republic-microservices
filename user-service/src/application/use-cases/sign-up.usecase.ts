import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';
import { UserRepository } from '../interfaces/user.repository.interface';
import { HashingService } from '../interfaces/hashing.service.interface';
import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { User } from '../../domain/entities/user';

@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashingService: HashingService,
  ) {}

  async execute(signUpDto: SignUpDto): Promise<void> {
    const { name, email, password, passwordConfirm, gender } = signUpDto;

    if (password !== passwordConfirm) {
      throw new PasswordNotMatchException('Passwords do not match');
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new EmailAlreadyExistsException(
        `The email ${email} already exists.`,
      );
    }

    const hashedPassword = await this.hashingService.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    await this.userRepository.create(user);
  }
}
