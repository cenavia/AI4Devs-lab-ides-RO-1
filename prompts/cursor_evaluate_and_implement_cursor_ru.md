# Evaluate and implement cursor rules
_Exported on 30/5/2025 at 20:03:23 GMT-5 from Cursor (0.50.7)_

---

**User**

We are using cursor which have cursorrules functionality. I have this repo url with awesome cursor rules: https://github.com/PatrickJS/awesome-cursorrules. Examine the repo and try to determine the best cursor rules for our current project and addthem to the cursorrules files)

---

**Cursor**

I'll help you examine the awesome-cursorrules repository and determine the best cursor rules for your current project. Let me start by exploring your current project structure to understand what type of project you're working with.

Now let me explore the frontend and backend directories to better understand the technology stack:

Let me check the README to understand the project better:

Let me also check the package.json files to understand the specific technologies used:

Now let me fetch the awesome-cursorrules repository to see what cursor rules are available:

Now I need to directly access some specific cursor rules from the awesome-cursorrules repository to understand what would be best for your project. Let me search for TypeScript and React/Express rules that would be most relevant:

Based on my examination of your current project structure and the available cursor rules from the awesome-cursorrules repository, I can see that you have a full-stack application with:

- **Frontend**: React with TypeScript, Tailwind CSS, and Jest
- **Backend**: Express.js with TypeScript, Prisma ORM, and PostgreSQL
- **Infrastructure**: Docker containerization

Let me create an appropriate `.cursorrules` file based on the best practices I found:

```plaintext
# TypeScript Full-Stack Project Rules

You are an expert full-stack TypeScript developer with deep knowledge of React, Node.js, Express, Prisma, and modern web development best practices.

## Project Context
This is a full-stack web application for talent tracking (LTI - Sistema de Seguimiento de Talento) with:
- Frontend: React 18 + TypeScript + Tailwind CSS + Jest
- Backend: Express.js + TypeScript + Prisma ORM
- Database: PostgreSQL (via Docker)
- Infrastructure: Docker Compose

## Code Style & Standards

### TypeScript
- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use strict type checking
- Avoid `any` type; use `unknown` or proper types
- Use const assertions where appropriate
- Prefer function declarations over arrow functions for top-level functions

### React Frontend
- Use functional components with hooks
- Prefer named exports over default exports
- Use TypeScript interfaces for component props
- Follow the composition pattern over inheritance
- Use React.memo() for performance optimization when needed
- Implement proper error boundaries
- Use custom hooks for reusable logic

### Express Backend
- Use async/await instead of callbacks
- Implement proper error handling middleware
- Use TypeScript types for request/response objects
- Follow REST API conventions
- Implement input validation for all endpoints
- Use dependency injection patterns where appropriate

### Prisma & Database
- Use Prisma schema-first approach
- Implement proper database migrations
- Use transactions for multi-step operations
- Follow naming conventions (camelCase for fields)
- Implement proper indexing strategies
- Use proper error handling for database operations

## File Structure & Organization

### Frontend Structure
```
frontend/src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── __tests__/          # Test files
```

### Backend Structure
```
backend/src/
├── controllers/        # Route handlers
├── middleware/         # Express middleware
├── models/            # Data models/types
├── routes/            # Route definitions
├── services/          # Business logic
├── utils/             # Utility functions
└── __tests__/         # Test files
```

## Best Practices

### Error Handling
- Always handle errors gracefully
- Use proper HTTP status codes
- Implement consistent error response format
- Log errors appropriately (without sensitive data)

### Security
- Validate all user inputs
- Use HTTPS in production
- Implement proper authentication/authorization
- Sanitize data before database operations
- Use environment variables for sensitive configuration

### Performance
- Implement proper caching strategies
- Use database indexing effectively
- Optimize React rendering with React.memo and useMemo
- Implement pagination for large data sets
- Use code splitting where appropriate

### Testing
- Write unit tests for utilities and pure functions
- Write integration tests for API endpoints
- Test React components with React Testing Library
- Maintain test coverage above 80%
- Use meaningful test descriptions

## Code Examples

### API Route Pattern
```typescript
// backend/src/routes/users.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### React Component Pattern
```typescript
// frontend/src/components/UserCard.tsx
import React from 'react';

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  onEdit?: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  id, 
  name, 
  email, 
  onEdit 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>
      {onEdit && (
        <button 
          onClick={() => onEdit(id)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
      )}
    </div>
  );
};
```

## Development Workflow
1. Always run type checking before committing
2. Ensure tests pass before pushing changes
3. Use meaningful commit messages following conventional commits
4. Update documentation when adding new features
5. Review code for security vulnerabilities
6. Test in development environment before production deployment

## Common Patterns to Follow
- Use dependency injection for better testability
- Implement proper logging throughout the application
- Use environment variables for configuration
- Follow the principle of least privilege for database access
- Implement proper input validation and sanitization
- Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Implement proper CORS configuration

## Common Anti-patterns to Avoid
- Don't use `any` type in TypeScript
- Don't commit sensitive data (API keys, passwords)
- Don't use direct DOM manipulation in React
- Don't ignore error handling
- Don't hardcode configuration values
- Don't use synchronous operations in Node.js
- Don't expose internal implementation details in APIs

When working on this project, always consider maintainability, scalability, security, and user experience. Ask clarifying questions if requirements are unclear, and suggest improvements when you see opportunities.
```

Perfect! I've created a comprehensive `.cursorrules` file specifically tailored for your LTI (Sistema de Seguimiento de Talento) project. This cursor rules file combines the best practices I found from the awesome-cursorrules repository and adapts them specifically for your full-stack TypeScript application.

## What I've included:

### **Project-Specific Context**
- Recognizes your exact tech stack (React 18, TypeScript, Tailwind, Express, Prisma, PostgreSQL)
- Understands the project purpose (talent tracking system)
- Accounts for your Docker setup

### **Technology-Specific Best Practices**
- **TypeScript**: Strict typing, interface preferences, avoiding `any`
- **React**: Functional components, hooks, proper prop typing, performance optimization
- **Express**: Async/await patterns, proper error handling, REST conventions  
- **Prisma**: Schema-first approach, migrations, transactions, proper naming
- **Testing**: Jest configuration, React Testing Library patterns

### **Code Organization**
- Clear folder structures for both frontend and backend
- Separation of concerns (components, services, utilities, etc.)
- Proper file naming conventions

### **Security & Performance**
- Input validation guidelines
- Database security practices
- React optimization techniques
- Caching strategies

### **Practical Code Examples**
- API route patterns with Prisma
- React component patterns with TypeScript
- Error handling examples

### **Development Workflow**
- Testing requirements
- Commit message standards
- Code review guidelines

This `.cursorrules` file will help Cursor AI:
1. **Understand your project context** and provide relevant suggestions
2. **Follow consistent coding patterns** across your full-stack application
3. **Implement security best practices** for web applications
4. **Optimize performance** for both React frontend and Express backend
5. **Maintain code quality** with TypeScript and testing standards

The rules are specifically designed for your talent tracking system and will help maintain consistency as your project grows. You can customize them further as your project evolves or if you have specific coding preferences for your team.

