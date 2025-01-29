import { StateRepository } from '../../application/interfaces/state.repository.interface';
import { LocaleService } from '../../application/interfaces/locale.service.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { State } from '../../domain/entities/state';
import { City } from '../../domain/entities/city';

interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECity {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
      };
    };
  };
}

@Injectable()
export class IBGELocaleService implements LocaleService {
  constructor(
    private httpService: HttpService,
    private stateRepository: StateRepository,
  ) {}

  async getCities(): Promise<City[]> {
    const response = await this.httpService.axiosRef.get<IBGECity[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
    );

    const states = await this.stateRepository.findAll();

    const cities = response.data.map(
      (city) =>
        new City({
          name: city.nome,
          stateId: states.find(
            (state) => state.uf === city.microrregiao.mesorregiao.UF.sigla,
          ).id,
        }),
    );

    return cities;
  }

  async getStates(): Promise<State[]> {
    const response = await this.httpService.axiosRef.get<IBGEState[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );

    const states = response.data.map(
      (state) =>
        new State({
          name: state.nome,
          uf: state.sigla,
        }),
    );

    return states;
  }
}
