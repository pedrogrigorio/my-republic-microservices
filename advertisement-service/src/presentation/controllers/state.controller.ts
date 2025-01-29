import { GrpcExceptionHandler } from '../handlers/grpc-exception-handler';
import { GetAllStatesUseCase } from '../../application/use-cases/get-all-states.usecase';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('states')
export class StateController {
  constructor(
    private getAllStatesUseCase: GetAllStatesUseCase,
  ) {}

  @GrpcMethod('StateService', 'getAllStates')
  async getAllStates() {
    try {
      const states = await this.getAllStatesUseCase.execute();
      return { states }
    } catch (error) {
      throw GrpcExceptionHandler.handleError(error);
    }
  }
}
