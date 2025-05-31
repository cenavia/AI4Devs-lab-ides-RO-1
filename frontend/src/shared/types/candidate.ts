export interface CandidateAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface CandidateEducation {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface CandidateWorkExperience {
  id?: string;
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface CandidateSkill {
  id?: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  category?: string;
}

export type CandidateStatus = 'ACTIVE' | 'INACTIVE' | 'HIRED' | 'REJECTED';

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: CandidateAddress;
  educations: CandidateEducation[];
  workExperiences: CandidateWorkExperience[];
  skills: CandidateSkill[];
  resumeUrl?: string;
  notes?: string;
  status: CandidateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: CandidateAddress;
  educations: CandidateEducation[];
  workExperiences: CandidateWorkExperience[];
  skills: CandidateSkill[];
  notes?: string;
  resume?: File;
  createdById: string;
} 