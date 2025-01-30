import { ApplicationResponseDto } from '../dtos/application-response.dto';
import { Application } from '../../domain/entities/application';

export class ApplicationMapper {
  static toDto(application: Application): ApplicationResponseDto {
    return {
      id: application.id,
      status: application.status,
      createdAt: application.createdAt,
      message: application.message,
      applicant: {
        id: application.applicant.id,
        name: application.applicant.name,
        imgSrc: application.applicant.imgSrc,
      },
      advertisement: {
        id: application.advertisement.id,
        title: application.advertisement.title,
        price: application.advertisement.price,
        imgSrc: application.advertisement.imgSrc,
        isActive: application.advertisement.isActive,
        state: {
          uf: application.advertisement.state.uf,
        },
        city: {
          name: application.advertisement.city.name,
        },
      },
    };
  }
}
