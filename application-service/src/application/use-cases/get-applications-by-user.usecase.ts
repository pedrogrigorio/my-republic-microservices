import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationPageDto } from '../dtos/application-page.dto';
import { Injectable } from '@nestjs/common';
import { ApplicationMapper } from '../mappers/application.mapper';

@Injectable()
export class GetApplicationsByUserUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(
    userId: number,
    page: number = 1,
    pageSize: number = 6,
  ): Promise<ApplicationPageDto> {
    const applicationPage = await this.applicationRepository.findByUser(
      userId,
      page,
      pageSize,
    );

    return {
      total: applicationPage.total,
      applications: applicationPage.applications.map((app) =>
        ApplicationMapper.toDto(app),
      ),
    };
  }
}
