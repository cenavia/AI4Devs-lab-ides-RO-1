import {
  Candidate,
  CandidateAddress,
  CandidateEducation,
  CandidateWorkExperience,
  CandidateSkill,
} from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';

export interface CreateCandidateDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: CandidateAddress;
  educations?: CandidateEducation[];
  workExperiences?: CandidateWorkExperience[];
  skills?: CandidateSkill[];
  resumeUrl?: string;
  notes?: string;
  createdById: string;
}

export class CreateCandidateUseCase {
  constructor(private readonly candidateRepository: ICandidateRepository) {}

  async execute(data: CreateCandidateDTO): Promise<Candidate> {
    // Validation
    if (!data.firstName.trim()) {
      throw new Error('First name is required');
    }

    if (!data.lastName.trim()) {
      throw new Error('Last name is required');
    }

    if (!Candidate.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (data.phone && !Candidate.isValidPhone(data.phone)) {
      throw new Error('Invalid phone format');
    }

    // Check if candidate with email already exists
    const existingCandidate = await this.candidateRepository.findByEmail(
      data.email,
    );
    if (existingCandidate) {
      throw new Error('Candidate with this email already exists');
    }

    // Create candidate
    const candidate = Candidate.create(
      data.firstName,
      data.lastName,
      data.email,
      data.createdById,
      data.phone,
      data.address,
      data.educations || [],
      data.workExperiences || [],
      data.skills || [],
      data.resumeUrl,
      data.notes,
    );

    await this.candidateRepository.save(candidate);
    return candidate;
  }
}
