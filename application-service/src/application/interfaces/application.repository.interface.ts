import { Application } from '../../domain/entities/application';
import { ApplicationPage } from '../../domain/entities/application-page';

export abstract class ApplicationRepository {
  abstract create(application: Application): Promise<void>;
  abstract update(application: Application): Promise<void>;
  abstract findAll(): Promise<Application[]>;
  abstract findById(applicationId: number): Promise<Application>;

  abstract findByAdvertisementId(
    advertisementId: number,
    page: number,
    pageSize: number,
  ): Promise<ApplicationPage>;

  abstract findByUser(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<ApplicationPage>;

  abstract deleteById(applicationId: number): Promise<void>;
}
