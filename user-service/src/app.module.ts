import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/services/prisma.service';
import { UserController } from './presentation/user.controller';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.usecase';
import { HashingService } from './application/interfaces/hashing.service.interface';
import { StorageService } from './application/interfaces/storage.service.interface';
import { UserRepository } from './application/interfaces/user.repository.interface';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-email.usecase';
import { UpdateEmailUseCase } from './application/use-cases/update-email.usecase';
import { UpdateNameUseCase } from './application/use-cases/update-name.usecase';
import { UpdatePasswordUseCase } from './application/use-cases/update-password.usecase';
import { UpdatePhotoUseCase } from './application/use-cases/update-photo.usecase';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user-repository';
import { BCryptHashingService } from './infrastructure/services/bcrypt-hashing.service';
import { S3StorageService } from './infrastructure/services/s3-storage.service';
import { ConfigModule } from '@nestjs/config';
import { ValidateUserUseCase } from './application/use-cases/validate-user.usecase';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
  providers: [
    ValidateUserUseCase,
    SignUpUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    UpdateNameUseCase,
    UpdateEmailUseCase,
    UpdatePasswordUseCase,
    UpdatePhotoUseCase,
    DeleteUserUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: StorageService,
      useClass: S3StorageService,
    },
    {
      provide: HashingService,
      useClass: BCryptHashingService,
    },
  ],
})
export class AppModule {}
