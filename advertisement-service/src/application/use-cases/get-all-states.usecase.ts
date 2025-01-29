import { StateRepository } from '../interfaces/state.repository.interface';
import { Injectable } from '@nestjs/common';
import { StateMapper } from '../mappers/state.mapper';

@Injectable()
export class GetAllStatesUseCase {
  constructor(private stateRepository: StateRepository) {}

  async execute() {
    const states = await this.stateRepository.findAll();

    return states.map((state) => StateMapper.toDto(state));
  }
}
