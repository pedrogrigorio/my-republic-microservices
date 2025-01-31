import { PrismaapplicantMapper } from '../mappers/prisma-applicant.mapper';
import { ApplicantRepository } from 'src/application/interfaces/applicant.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Applicant } from 'src/domain/entities/applicant';

@Injectable()
export class PrismaApplicantRepository implements ApplicantRepository {
  constructor(private prisma: PrismaService) {}

  async findById(applicantId: number): Promise<Applicant> {
    const applicant = await this.prisma.applicant.findUnique({
      where: {
        id: applicantId,
      },
    });
    
    if (!applicant) {
      return null;
    }
    
    return PrismaapplicantMapper.toDomain(applicant);
  }

  async create(applicant: Applicant): Promise<void> {
    await this.prisma.applicant.create({
      data: {
        id: applicant.id,
        name: applicant.name,
        imgSrc: applicant.imgSrc,
      },
    });
  }

  async update(applicant: Applicant): Promise<void> {
    await this.prisma.applicant.update({
      data: {
        name: applicant.name,
        imgSrc: applicant.imgSrc,
      },
      where: {
        id: applicant.id,
      },
    });
  }

  async deleteById(applicantId: number): Promise<void> {
    await this.prisma.applicant.delete({
      where: {
        id: applicantId,
      },
    });
  }
}
