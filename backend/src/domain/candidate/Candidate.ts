import { randomUUID } from 'crypto';

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
  startDate?: Date;
  endDate?: Date;
  isCurrent: boolean;
}

export interface CandidateWorkExperience {
  id?: string;
  company: string;
  position: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isCurrent: boolean;
}

export interface CandidateSkill {
  id?: string;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  category?: string;
}

export type CandidateStatus = 'ACTIVE' | 'INACTIVE' | 'HIRED' | 'REJECTED';

export class Candidate {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly email: string;
  private readonly phone?: string;
  private readonly address?: CandidateAddress;
  private readonly educations: CandidateEducation[];
  private readonly workExperiences: CandidateWorkExperience[];
  private readonly skills: CandidateSkill[];
  private readonly resumeUrl?: string;
  private readonly notes?: string;
  private readonly status: CandidateStatus;
  private readonly createdById: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdById: string,
    phone?: string,
    address?: CandidateAddress,
    educations: CandidateEducation[] = [],
    workExperiences: CandidateWorkExperience[] = [],
    skills: CandidateSkill[] = [],
    resumeUrl?: string,
    notes?: string,
    status: CandidateStatus = 'ACTIVE',
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.educations = educations;
    this.workExperiences = workExperiences;
    this.skills = skills;
    this.resumeUrl = resumeUrl;
    this.notes = notes;
    this.status = status;
    this.createdById = createdById;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Getters
  public getId(): string {
    return this.id;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  public getEmail(): string {
    return this.email;
  }
  public getPhone(): string | undefined {
    return this.phone;
  }
  public getAddress(): CandidateAddress | undefined {
    return this.address;
  }
  public getEducations(): CandidateEducation[] {
    return this.educations;
  }
  public getWorkExperiences(): CandidateWorkExperience[] {
    return this.workExperiences;
  }
  public getSkills(): CandidateSkill[] {
    return this.skills;
  }
  public getResumeUrl(): string | undefined {
    return this.resumeUrl;
  }
  public getNotes(): string | undefined {
    return this.notes;
  }
  public getStatus(): CandidateStatus {
    return this.status;
  }
  public getCreatedById(): string {
    return this.createdById;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Static factory method
  public static create(
    firstName: string,
    lastName: string,
    email: string,
    createdById: string,
    phone?: string,
    address?: CandidateAddress,
    educations: CandidateEducation[] = [],
    workExperiences: CandidateWorkExperience[] = [],
    skills: CandidateSkill[] = [],
    resumeUrl?: string,
    notes?: string,
  ): Candidate {
    const id = randomUUID();
    return new Candidate(
      id,
      firstName,
      lastName,
      email,
      createdById,
      phone,
      address,
      educations,
      workExperiences,
      skills,
      resumeUrl,
      notes,
    );
  }

  // Validation methods
  public static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }
}
