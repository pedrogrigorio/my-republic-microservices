import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationMapper } from '../mappers/application.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllApplicationsUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute() {
    const applications = await this.applicationRepository.findAll();

    return applications.map((app) => ApplicationMapper.toDto(app));
  }
}
