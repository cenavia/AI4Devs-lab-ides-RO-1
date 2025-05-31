import express from 'express';
import cors from 'cors';
import path from 'path';
import { UserController } from './interfaces/http/UserController';
import { CandidateController } from './interfaces/http/CandidateController';
import { FileStorageService } from './infrastructure/storage/FileStorageService';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File storage service
const fileStorageService = new FileStorageService();
const upload = fileStorageService.getMulterConfig();

// Serve uploaded files
app.use(
  '/api/files/resumes',
  express.static(path.join(process.cwd(), 'uploads', 'resumes')),
);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ATS API',
      version: '1.0.0',
      description: 'Applicant Tracking System API with DDD architecture',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/interfaces/http/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Controllers
const userController = new UserController();
const candidateController = new CandidateController();

// Routes
// User routes
app.post('/api/users', (req, res) => userController.create(req, res));

// Candidate routes
app.post('/api/candidates', upload.single('resume'), (req, res) =>
  candidateController.create(req, res),
);
app.get('/api/candidates', (req, res) => candidateController.getAll(req, res));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(
      `Swagger documentation available at http://localhost:${port}/api-docs`,
    );
    console.log(
      `Health check available at http://localhost:${port}/api/health`,
    );
  });
}

export { app };
