# Configuración de Proyecto Backend con DDD y TDD
_Exported on 27/5/2025 at 13:33:47 GMT-5 from Cursor (0.50.7)_

---

**User**

## 🧠 Rol del asistente
Eres un **arquitecto de software experto en Node.js, TypeScript y DDD**, con experiencia en implementación de backend siguiendo los principios SOLID, TDD y buenas prácticas de organización de código.

## 🛠️ Objetivo
Generar un proyecto backend inicial funcional, basado en:

- Lenguaje: TypeScript
- Framework: Express.js
- Base de diseño: Domain-Driven Design (DDD)
- Principios de código: SOLID
- Metodología de desarrollo: Test-Driven Development (TDD)

## 📦 Requisitos
1. Estructura del proyecto organizada en capas (Domain, Application, Infrastructure, Interfaces).
2. Configuración inicial de pruebas con Jest.
3. Implementación de un caso de uso de ejemplo con su entidad, repositorio, controlador y prueba unitaria básica.
4. Instrucciones CLI para crear el entorno paso a paso.
5. Uso de ESModules o CommonJS según recomendación.
6. Configuración de linter y prettier opcional.
7. Archivo `README.md` con instrucciones de ejecución y pruebas.

## 📁 Salida esperada
- Estructura inicial de carpetas y archivos.
- Comandos CLI para iniciar el proyecto y dependencias recomendadas.
- Archivos de configuración: `tsconfig.json`, `jest.config.ts`, `.eslintrc.js`, `.prettierrc`, `.gitignore`.
- Código de ejemplo mínimo funcional (p. ej., entidad `User`, caso de uso `CreateUser`, prueba unitaria).

backend/
├── src/
│   ├── domain/
│   │   └── user/
│   │       ├── User.ts
│   │       └── IUserRepository.ts
│   ├── application/
│   │   └── user/
│   │       └── CreateUserUseCase.ts
│   ├── infrastructure/
│   │   └── user/
│   │       └── UserRepository.ts
│   ├── interfaces/
│   │   └── http/
│   │       └── UserController.ts
│   ├── shared/
│   │   ├── config/
│   │   └── utils/
│   └── index.ts
├── tests/
│   └── user/
│       └── CreateUserUseCase.test.ts
├── package.json
├── tsconfig.json
├── jest.config.ts
├── .eslintrc.js
├── .prettierrc
├── .gitignore
└── README.md



---

**Cursor**

I'll help you create a well-structured backend project following DDD principles, SOLID, and TDD practices. Let's start by examining the current state and then make the necessary changes.

First, let's check what we already have in the backend directory:



Let's also check the current package.json to see what dependencies we have:


Great! We already have most of the necessary dependencies. Let's create the DDD structure and implement a basic User domain with its use case. I'll create the necessary files and structure:

1. First, let's create the domain layer with the User entity:


```typescript
export class User {
    private readonly id: string;
    private readonly email: string;
    private readonly name: string;
    private readonly createdAt: Date;

    constructor(id: string, email: string, name: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.createdAt = new Date();
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getName(): string {
        return this.name;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public static create(email: string, name: string): User {
        const id = crypto.randomUUID();
        return new User(id, email, name);
    }
}
```

2. Now, let's create the repository interface:


```typescript
import { User } from './User';

export interface IUserRepository {
    save(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}
```

3. Let's create the application layer with the CreateUser use case:


```typescript
import { User } from '../../domain/user/User';
import { IUserRepository } from '../../domain/user/IUserRepository';

export interface CreateUserDTO {
    email: string;
    name: string;
}

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const user = User.create(data.email, data.name);
        await this.userRepository.save(user);
        
        return user;
    }
}
```

4. Let's create the infrastructure layer with the repository implementation:


```typescript
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/user/User';
import { IUserRepository } from '../../domain/user/IUserRepository';

export class UserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
                createdAt: user.getCreatedAt()
            }
        });
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return new User(user.id, user.email, user.name);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return new User(user.id, user.email, user.name);
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map(user => new User(user.id, user.email, user.name));
    }
}
```

5. Let's create the HTTP controller:


```typescript
import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/user/CreateUserUseCase';
import { UserRepository } from '../../infrastructure/user/UserRepository';

export class UserController {
    private createUserUseCase: CreateUserUseCase;

    constructor() {
        const userRepository = new UserRepository();
        this.createUserUseCase = new CreateUserUseCase(userRepository);
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, name } = req.body;

            if (!email || !name) {
                return res.status(400).json({
                    error: 'Email and name are required'
                });
            }

            const user = await this.createUserUseCase.execute({ email, name });

            return res.status(201).json({
                id: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
                createdAt: user.getCreatedAt()
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                });
            }
            return res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}
```

6. Let's create a test for the CreateUser use case:


```typescript
import { CreateUserUseCase } from '../../application/user/CreateUserUseCase';
import { IUserRepository } from '../../domain/user/IUserRepository';
import { User } from '../../domain/user/User';

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let mockUserRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        mockUserRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findAll: jest.fn()
        };

        createUserUseCase = new CreateUserUseCase(mockUserRepository);
    });

    it('should create a new user successfully', async () => {
        const userData = {
            email: 'test@example.com',
            name: 'Test User'
        };

        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.save.mockResolvedValue();

        const user = await createUserUseCase.execute(userData);

        expect(user).toBeInstanceOf(User);
        expect(user.getEmail()).toBe(userData.email);
        expect(user.getName()).toBe(userData.name);
        expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an error if user with email already exists', async () => {
        const userData = {
            email: 'existing@example.com',
            name: 'Existing User'
        };

        const existingUser = User.create(userData.email, userData.name);
        mockUserRepository.findByEmail.mockResolvedValue(existingUser);

        await expect(createUserUseCase.execute(userData)).rejects.toThrow(
            'User with this email already exists'
        );
    });
});
```

7. Let's create the Prisma schema for our User model:


```plaintext
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id
  email     String   @unique
  name      String
  createdAt DateTime @default(now())

  @@map("users")
}
```

8. Finally, let's update the main application file to set up the Express server:


```typescript
import express from 'express';
import { UserController } from './interfaces/http/UserController';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'A simple User API with DDD architecture'
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['./src/interfaces/http/*.ts']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const userController = new UserController();
app.post('/users', (req, res) => userController.create(req, res));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
```

Now that we have created all the necessary files and structure, let me provide you with the instructions to get started:

1. First, create a `.env` file in the backend directory with your database configuration:
```
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"
PORT=3000
```

2. Install dependencies and set up the database:
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
```

3. Run the development server:
```bash
npm run dev
```

The project structure follows DDD principles with clear separation of concerns:

- **Domain Layer**: Contains the core business logic (`User` entity and `IUserRepository` interface)
- **Application Layer**: Contains use cases (`CreateUserUseCase`)
- **Infrastructure Layer**: Contains implementations of repositories (`UserRepository`)
- **Interfaces Layer**: Contains HTTP controllers (`UserController`)

The code follows SOLID principles:
- **Single Responsibility**: Each class has a single responsibility
- **Open/Closed**: The system is open for extension through interfaces
- **Liskov Substitution**: Repository implementations can be substituted
- **Interface Segregation**: Interfaces are specific to client needs
- **Dependency Inversion**: High-level modules depend on abstractions

For testing, we've implemented a basic test suite for the `CreateUserUseCase` using Jest. You can run the tests with:
```bash
npm test
```

The API documentation is available at `http://localhost:3000/api-docs` when the server is running.

Would you like me to explain any part of the implementation in more detail or make any adjustments to the code?

```plaintext
DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name"
PORT=3000
```

```shellscript
cd backend
npm install
npx prisma generate
npx prisma db push
```

```shellscript
npm run dev
```

```shellscript
npm test
```

