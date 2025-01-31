import { AdvertisementNotFoundException } from 'src/domain/exceptions/advertisement-not-found.exception';
import { ApplicationNotFoundException } from 'src/domain/exceptions/application-not-found.exception';
import { AdvertisementPausedException } from 'src/domain/exceptions/advertisement-paused.exception';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';


export class GrpcExceptionHandler {
  static handleError(error: any): RpcException {
    let code = status.INTERNAL;
    let message = 'An unexpected error occurred';

    // Mapeamento de exceções customizadas para códigos gRPC
    if (error instanceof AdvertisementPausedException) {
      code = status.INVALID_ARGUMENT;
      message = error.message;
    } else if (
      error instanceof ApplicationNotFoundException || 
      error instanceof AdvertisementNotFoundException
    ) {
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
