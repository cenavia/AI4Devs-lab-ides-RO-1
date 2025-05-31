import { PrismaClient } from '@prisma/client';
import {
  Candidate,
  CandidateAddress,
  CandidateEducation,
  CandidateWorkExperience,
  CandidateSkill,
} from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';

export class CandidateRepository implements ICandidateRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async save(candidate: Candidate): Promise<void> {
    await this.prisma.candidate.create({
      data: {
        id: candidate.getId(),
        firstName: candidate.getFirstName(),
        lastName: candidate.getLastName(),
        email: candidate.getEmail(),
        phone: candidate.getPhone(),
        address: candidate.getAddress()
          ? JSON.parse(JSON.stringify(candidate.getAddress()))
          : null,
        educations: candidate.getEducations()
          ? JSON.parse(JSON.stringify(candidate.getEducations()))
          : null,
        workExperiences: candidate.getWorkExperiences()
          ? JSON.parse(JSON.stringify(candidate.getWorkExperiences()))
          : null,
        skills: candidate.getSkills()
          ? JSON.parse(JSON.stringify(candidate.getSkills()))
          : null,
        resumeUrl: candidate.getResumeUrl(),
        notes: candidate.getNotes(),
        status: candidate.getStatus(),
        createdById: candidate.getCreatedById(),
        createdAt: candidate.getCreatedAt(),
        updatedAt: candidate.getUpdatedAt(),
      },
    });
  }

  async findById(id: string): Promise<Candidate | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });

    if (!candidate) return null;
    return this.mapToDomain(candidate);
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { email },
    });

    if (!candidate) return null;
    return this.mapToDomain(candidate);
  }

  async findAll(): Promise<Candidate[]> {
    const candidates = await this.prisma.candidate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return candidates.map((candidate) => this.mapToDomain(candidate));
  }

  async findByCreatedById(createdById: string): Promise<Candidate[]> {
    const candidates = await this.prisma.candidate.findMany({
      where: { createdById },
      orderBy: { createdAt: 'desc' },
    });

    return candidates.map((candidate) => this.mapToDomain(candidate));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.candidate.delete({
      where: { id },
    });
  }

  private mapToDomain(data: any): Candidate {
    return new Candidate(
      data.id,
      data.firstName,
      data.lastName,
      data.email,
      data.createdById,
      data.phone,
      (data.address as CandidateAddress) || undefined,
      (data.educations as CandidateEducation[]) || [],
      (data.workExperiences as CandidateWorkExperience[]) || [],
      (data.skills as CandidateSkill[]) || [],
      data.resumeUrl,
      data.notes,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }
}
