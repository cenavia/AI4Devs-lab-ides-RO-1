import { Candidate } from './Candidate';

export interface ICandidateRepository {
  save(candidate: Candidate): Promise<void>;
  findById(id: string): Promise<Candidate | null>;
  findByEmail(email: string): Promise<Candidate | null>;
  findAll(): Promise<Candidate[]>;
  findByCreatedById(createdById: string): Promise<Candidate[]>;
  delete(id: string): Promise<void>;
}
