import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { EmailAlreadyExistsException } from 'src/domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from 'src/domain/exceptions/password-not-match.exception';
import { InvalidPasswordException } from 'src/domain/exceptions/invalid-password.exception';
import { InvalidGenderException } from 'src/domain/exceptions/invalid-gender.exception';
import { InvalidEmailException } from 'src/domain/exceptions/invalid-email.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import { AuthException } from 'src/domain/exceptions/auth.exception';

export class GrpcExceptionHandler {
  static handleError(error: any): RpcException {
    let code = status.INTERNAL;
    let message = 'An unexpected error occurred';

    // Mapeamento de exceções customizadas para códigos gRPC
    if (error instanceof EmailAlreadyExistsException) {
      code = status.ALREADY_EXISTS;
      message = error.message;
    } else if (
      error instanceof InvalidPasswordException ||
      error instanceof InvalidGenderException ||
      error instanceof InvalidEmailException ||
      error instanceof PasswordNotMatchException
    ) {
      code = status.INVALID_ARGUMENT;
      message = error.message;
    } else if (error instanceof UserNotFoundException) {
      code = status.NOT_FOUND;
      message = error.message;
    } else if (error instanceof AuthException) {
      code = status.UNAUTHENTICATED;
      message = error.message;
    }

    // Cria a RpcException com o código e a mensagem mapeados
    return new RpcException({
      code,
      message,
    });
  }
}
