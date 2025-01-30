import { ApplicationStatus } from '../../domain/enums/application-status';

export class ApplicationResponseDto {
  id: number;
  status: ApplicationStatus;
  createdAt: Date;
  message: string;
  applicant: {
    id: number;
    name: string;
    imgSrc: string;
  };
  advertisement: {
    id: number;
    title: string;
    price: number;
    imgSrc: string;
    isActive: boolean;
    city: {
      name: string;
    };
    state: {
      uf: string;
    };
  };
}
