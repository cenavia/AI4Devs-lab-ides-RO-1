import { Request, Response } from 'express';
import { CreateCandidateUseCase } from '../../application/candidate/CreateCandidateUseCase';
import { GetCandidatesUseCase } from '../../application/candidate/GetCandidatesUseCase';
import { CandidateRepository } from '../../infrastructure/candidate/CandidateRepository';
import { FileStorageService } from '../../infrastructure/storage/FileStorageService';

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateAddress:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         zipCode:
 *           type: string
 *     CandidateEducation:
 *       type: object
 *       required:
 *         - institution
 *         - degree
 *         - isCurrent
 *       properties:
 *         institution:
 *           type: string
 *         degree:
 *           type: string
 *         fieldOfStudy:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         isCurrent:
 *           type: boolean
 *     CandidateWorkExperience:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - isCurrent
 *       properties:
 *         company:
 *           type: string
 *         position:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         isCurrent:
 *           type: boolean
 *     CandidateSkill:
 *       type: object
 *       required:
 *         - name
 *         - level
 *       properties:
 *         name:
 *           type: string
 *         level:
 *           type: string
 *           enum: [BEGINNER, INTERMEDIATE, ADVANCED, EXPERT]
 *         category:
 *           type: string
 *     Candidate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/CandidateAddress'
 *         educations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CandidateEducation'
 *         workExperiences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CandidateWorkExperience'
 *         skills:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CandidateSkill'
 *         resumeUrl:
 *           type: string
 *         notes:
 *           type: string
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, HIRED, REJECTED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export class CandidateController {
  private createCandidateUseCase: CreateCandidateUseCase;
  private getCandidatesUseCase: GetCandidatesUseCase;
  private fileStorageService: FileStorageService;

  constructor() {
    const candidateRepository = new CandidateRepository();
    this.createCandidateUseCase = new CreateCandidateUseCase(
      candidateRepository,
    );
    this.getCandidatesUseCase = new GetCandidatesUseCase(candidateRepository);
    this.fileStorageService = new FileStorageService();
  }

  /**
   * @swagger
   * /api/candidates:
   *   post:
   *     summary: Create a new candidate
   *     tags: [Candidates]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - email
   *               - createdById
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               phone:
   *                 type: string
   *               address:
   *                 type: string
   *                 description: JSON string of address object
   *               educations:
   *                 type: string
   *                 description: JSON string of educations array
   *               workExperiences:
   *                 type: string
   *                 description: JSON string of work experiences array
   *               skills:
   *                 type: string
   *                 description: JSON string of skills array
   *               notes:
   *                 type: string
   *               createdById:
   *                 type: string
   *               resume:
   *                 type: string
   *                 format: binary
   *                 description: PDF or DOCX file
   *     responses:
   *       201:
   *         description: Candidate created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Candidate'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Server error
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        educations,
        workExperiences,
        skills,
        notes,
        createdById,
      } = req.body;

      // Validation
      if (!firstName || !lastName || !email || !createdById) {
        return res.status(400).json({
          error: 'First name, last name, email, and createdById are required',
        });
      }

      // Parse JSON strings
      let parsedAddress = null;
      let parsedEducations: any[] = [];
      let parsedWorkExperiences: any[] = [];
      let parsedSkills: any[] = [];

      try {
        if (address) {
          parsedAddress = JSON.parse(address);
        }
        if (educations) {
          parsedEducations = JSON.parse(educations);
        }
        if (workExperiences) {
          parsedWorkExperiences = JSON.parse(workExperiences);
        }
        if (skills) {
          parsedSkills = JSON.parse(skills);
        }
      } catch (parseError) {
        return res.status(400).json({
          error: 'Invalid JSON format in request body',
        });
      }

      // Handle file upload
      let resumeUrl: string | undefined = undefined;
      if (req.file) {
        try {
          resumeUrl = this.fileStorageService.getFileUrl(req.file.filename);
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          return res.status(400).json({
            error: 'Failed to process resume file',
          });
        }
      }

      // Create candidate
      const candidateData = {
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        address: parsedAddress,
        educations: parsedEducations,
        workExperiences: parsedWorkExperiences,
        skills: parsedSkills,
        resumeUrl,
        notes: notes || undefined,
        createdById,
      };

      const candidate =
        await this.createCandidateUseCase.execute(candidateData);

      return res.status(201).json({
        id: candidate.getId(),
        firstName: candidate.getFirstName(),
        lastName: candidate.getLastName(),
        email: candidate.getEmail(),
        phone: candidate.getPhone(),
        address: candidate.getAddress(),
        educations: candidate.getEducations(),
        workExperiences: candidate.getWorkExperiences(),
        skills: candidate.getSkills(),
        resumeUrl: candidate.getResumeUrl(),
        notes: candidate.getNotes(),
        status: candidate.getStatus(),
        createdAt: candidate.getCreatedAt(),
        updatedAt: candidate.getUpdatedAt(),
      });
    } catch (error) {
      console.error('Create candidate error:', error);
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
        });
      }
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  /**
   * @swagger
   * /api/candidates:
   *   get:
   *     summary: Get all candidates
   *     tags: [Candidates]
   *     responses:
   *       200:
   *         description: List of candidates retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Candidate'
   *       500:
   *         description: Server error
   */
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const candidates = await this.getCandidatesUseCase.execute();

      const candidatesData = candidates.map((candidate) => ({
        id: candidate.getId(),
        firstName: candidate.getFirstName(),
        lastName: candidate.getLastName(),
        email: candidate.getEmail(),
        phone: candidate.getPhone(),
        address: candidate.getAddress(),
        educations: candidate.getEducations(),
        workExperiences: candidate.getWorkExperiences(),
        skills: candidate.getSkills(),
        resumeUrl: candidate.getResumeUrl(),
        notes: candidate.getNotes(),
        status: candidate.getStatus(),
        createdAt: candidate.getCreatedAt(),
        updatedAt: candidate.getUpdatedAt(),
      }));

      return res.status(200).json(candidatesData);
    } catch (error) {
      console.error('Get candidates error:', error);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}
