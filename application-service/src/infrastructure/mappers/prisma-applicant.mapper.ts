import { Applicant as RawApplicant } from '@prisma/client';
import { Applicant } from 'src/domain/entities/applicant';

export class PrismaapplicantMapper {
  static toPrisma(applicant: Applicant): RawApplicant {
    return {
      id: applicant.id,
      name: applicant.name,
      imgSrc: applicant.imgSrc,
    };
  }

  static toDomain(raw: RawApplicant): Applicant {
    return new Applicant(
      {
        name: raw.name,
        imgSrc: raw.imgSrc,
      },
      raw.id,
    );
  }
}
