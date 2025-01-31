import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { ApplicationPageDto } from '../dtos/application-page.dto';
import { ApplicationMapper } from '../mappers/application.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetApplicationsByAdvertisementUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(
    advertisementId: number,
    page: number = 1,
    pageSize: number = 6,
  ): Promise<ApplicationPageDto> {
    console.log('executando use case: ', advertisementId)
    const applicationPage =
      await this.applicationRepository.findByAdvertisementId(
        advertisementId,
        page,
        pageSize,
      );
    
    console.log(applicationPage)
    
    return {
      total: applicationPage.total,
      applications: applicationPage.applications.map((app) =>
        ApplicationMapper.toDto(app),
      ),
    };
  }
}
