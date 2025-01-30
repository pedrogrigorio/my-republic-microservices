import { UpdatePasswordUseCase } from '../application/use-cases/update-password.usecase';
import { GrpcExceptionHandler } from './handlers/grpc-exception-handler';
import { ValidateUserUseCase } from 'src/application/use-cases/validate-user.usecase';
import { UpdatePhotoUseCase } from '../application/use-cases/update-photo.usecase';
import { UpdateEmailUseCase } from '../application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.usecase';
import { UpdateNameUseCase } from '../application/use-cases/update-name.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { SignUpUseCase } from '../application/use-cases/sign-up.usecase';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserById: GetUserByIdUseCase,
    private updateNameUseCase: UpdateNameUseCase,
    private updateEmailUseCase: UpdateEmailUseCase,
    private updatePasswordUseCase: UpdatePasswordUseCase,
    private updatePhotoUseCase: UpdatePhotoUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private validateUserUseCase: ValidateUserUseCase,
  ) {}

  @GrpcMethod('UserService', 'signUp')
  async signUp(data: any) {
    try {
      await this.signUpUseCase.execute(data);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'getAllUsers')
  async getAllUsers() {
    try {
      const users = await this.getAllUsersUseCase.execute();

      return { users };
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'getUserById')
  async getUser(data: any) {
    try {
      const user = await this.getUserById.execute(data.id);
      return { user };
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'updateName')
  async updateName(data: any) {
    try {
      await this.updateNameUseCase.execute(data.body, data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'updateEmail')
  async updateEmail(data: any) {
    try {
      await this.updateEmailUseCase.execute(data.body, data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'updatePassword')
  async updatePassword(data: any) {
    try {
      await this.updatePasswordUseCase.execute(data.body, data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'updatePhoto')
  async updatePhoto(data: any) {
    try {
      const updatedUser = await this.updatePhotoUseCase.execute(
        data.file,
        data.id,
      );

      return updatedUser;
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'deleteUser')
  async deleteUser(data: any) {
    try {
      await this.deleteUserUseCase.execute(data.id);
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }

  @GrpcMethod('UserService', 'validateUser')
  async validateUser(data: any) {
    try {
      const user = await this.validateUserUseCase.execute(data);
      return { user };
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
