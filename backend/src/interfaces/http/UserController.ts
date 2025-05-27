import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/user/CreateUserUseCase';
import { UserRepository } from '../../infrastructure/user/UserRepository';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user's email
 *         name:
 *           type: string
 *           description: The user's name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

export class UserController {
  private createUserUseCase: CreateUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - name
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               name:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name } = req.body;

      if (!email || !name) {
        return res.status(400).json({
          error: 'Email and name are required',
        });
      }

      const user = await this.createUserUseCase.execute({ email, name });

      return res.status(201).json({
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        createdAt: user.getCreatedAt(),
      });
    } catch (error) {
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
}
