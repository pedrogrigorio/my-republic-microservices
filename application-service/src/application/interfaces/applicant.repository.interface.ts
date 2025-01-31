import { Applicant } from 'src/domain/entities/applicant';

export abstract class ApplicantRepository {
  abstract create(applicant: Applicant): Promise<void>;
  abstract update(applicant: Applicant): Promise<void>;
  abstract findById(applicantId: number): Promise<Applicant>;
  abstract deleteById(applicantId: number): Promise<void>;
}
