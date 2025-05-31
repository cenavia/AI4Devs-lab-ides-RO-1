import { Candidate } from '../../domain/candidate/Candidate';
import { ICandidateRepository } from '../../domain/candidate/ICandidateRepository';

export class GetCandidatesUseCase {
  constructor(private readonly candidateRepository: ICandidateRepository) {}

  async execute(): Promise<Candidate[]> {
    return await this.candidateRepository.findAll();
  }

  async executeByRecruiter(recruiterId: string): Promise<Candidate[]> {
    return await this.candidateRepository.findByCreatedById(recruiterId);
  }
}
