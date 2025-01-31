import { ApplicantNotFoundException } from 'src/domain/exceptions/applicant-not-found.exception';
import { ApplicantRepository } from '../interfaces/applicant.repository.interface';
import { Injectable } from '@nestjs/common';
import { Applicant } from 'src/domain/entities/applicant';

@Injectable()
export class UpdateApplicantUseCase {
  constructor(
    private applicantRepository: ApplicantRepository,
  ) {}

  async execute(applicantDto: {id: number; name: string; imgSrc: string}): Promise<void> {
    const existingApplicant = this.applicantRepository.findById(applicantDto.id);

    if (!existingApplicant) {
      throw new ApplicantNotFoundException(`Applicant with id ${applicantDto.id} not found`)
    }

    const applicant = new Applicant({ 
      name: applicantDto.name,
      imgSrc: applicantDto.imgSrc,
    }, applicantDto.id);

    await this.applicantRepository.update(applicant);
  }
}
