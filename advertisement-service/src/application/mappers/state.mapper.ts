import { StateResponseDto } from '../dtos/state-response.dto';
import { State } from '../../domain/entities/state';

export class StateMapper {
  static toDto(state: State): StateResponseDto {
    return {
      id: state.id,
      uf: state.uf,
      name: state.name,
    };
  }
}
