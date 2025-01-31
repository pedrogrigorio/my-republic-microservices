import { ApplicantNotFoundException } from 'src/domain/exceptions/applicant-not-found.exception';
import { ApplicantRepository } from '../interfaces/applicant.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteApplicantUseCase {
  constructor(
    private applicantRepository: ApplicantRepository,
  ) {}

  async execute(applicantDto: { id: number }): Promise<void> {
    const existingApplicant = this.applicantRepository.findById(applicantDto.id);
    
    if (!existingApplicant) {
      throw new ApplicantNotFoundException(`Applicant with id ${applicantDto.id} not found`)
    }

    await this.applicantRepository.deleteById(applicantDto.id);
  }
}
