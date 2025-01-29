import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { StateService } from '../services/state.service';
import { firstValueFrom } from 'rxjs';

@Controller('states')
export class StateController {
  private stateService: StateService;

  constructor(
    @Inject('ADVERTISEMENT_SERVICE') private advertisementClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.stateService =
      this.advertisementClient.getService<StateService>('StateService');
  }

  @Get()
  async getAllStates() {
    console.log('Get todos os estados');
    const { states } = await firstValueFrom(
      this.stateService.getAllStates({}),
    ).catch((e) => {
      throw new RpcException(e);
    });

    return states;
  }
}
