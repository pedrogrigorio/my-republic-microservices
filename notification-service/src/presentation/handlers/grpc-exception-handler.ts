import { NotificationNotFoundException } from 'src/domain/exceptions/notification-not-found.exception';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';


export class GrpcExceptionHandler {
  static handleError(error: any): RpcException {
    let code = status.INTERNAL;
    let message = 'An unexpected error occurred';

    // Mapeamento de exceções customizadas para códigos gRPC
    if (error instanceof NotificationNotFoundException) {
      code = status.NOT_FOUND;
      message = error.message;
    }

    // Cria a RpcException com o código e a mensagem mapeados
    return new RpcException({
      code,
      message,
    });
  }
}
