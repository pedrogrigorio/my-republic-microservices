import { ApplicantRepository } from '../interfaces/applicant.repository.interface';
import { Injectable } from '@nestjs/common';
import { Applicant } from 'src/domain/entities/applicant';

@Injectable()
export class CreateApplicantUseCase {
  constructor(
    private applicantRepository: ApplicantRepository,
  ) {}

  async execute(applicantDto: {id: number; name: string; imgSrc: string}): Promise<void> {
    const applicant = new Applicant({ 
      name: applicantDto.name,
      imgSrc: applicantDto.imgSrc,
    }, applicantDto.id);

    await this.applicantRepository.create(applicant);
  }
}
