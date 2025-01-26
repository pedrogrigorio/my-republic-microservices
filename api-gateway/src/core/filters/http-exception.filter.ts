import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { status } from '@grpc/grpc-js';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const err = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorMessage = 'Internal server error';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (err instanceof Error) {
      errorMessage = err.message || errorMessage;
    } else if (typeof err === 'object' && err !== null) {
      errorMessage = (err as any).message || 'Unknown error';
    } else if (typeof err === 'string') {
      errorMessage = err;
    }

    switch ((err as any).code) {
      case status.INVALID_ARGUMENT:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case status.ALREADY_EXISTS:
        statusCode = HttpStatus.CONFLICT;
        break;
      case status.NOT_FOUND:
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case status.UNAUTHENTICATED:
        statusCode = HttpStatus.UNAUTHORIZED;
        break;
      case status.PERMISSION_DENIED:
        statusCode = HttpStatus.FORBIDDEN;
        break;
      case status.INTERNAL:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case status.UNKNOWN:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    // Retornando a resposta HTTP com status adequado
    response.status(statusCode).json({
      statusCode,
      message: errorMessage,
    });
  }
}
