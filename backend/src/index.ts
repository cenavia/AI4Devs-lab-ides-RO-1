import express from 'express';
import { UserController } from './interfaces/http/UserController';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple User API with DDD architecture',
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

// Routes
const userController = new UserController();
app.post('/users', (req, res) => userController.create(req, res));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`,
  );
});
