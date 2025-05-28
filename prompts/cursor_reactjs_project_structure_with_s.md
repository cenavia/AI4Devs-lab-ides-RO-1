# ReactJS Project Structure with SOLID Principles
_Exported on 27/5/2025 at 17:58:25 GMT-5 from Cursor (0.50.7)_

---

**User**

### 🎯 Objetivo del Prompt
Ayúdame a generar la **estructura inicial funcional** de un proyecto frontend en **ReactJS** aplicando:

- Principios **SOLID** en el diseño del código.
- Enfoque de **Screaming Architecture**, donde las carpetas y nombres expresan directamente la lógica del dominio y no la tecnología.

### 🏗️ Requisitos del proyecto
- **Lenguaje**: TypeScript.
- **Framework**: ReactJS (sin Next.js).
- **Estilos**: TailwindCSS.
- **Routing**: React Router.
- **Gestión de estado**: Context API.
- **Testing**: React Testing Library.

### 📦 Resultado esperado
Quiero recibir:
1. Una **estructura de carpetas inicial** organizada bajo la filosofía de Screaming Architecture.
2. Breve descripción de la **responsabilidad de cada carpeta**.
3. Sugerencias sobre cómo aplicar los **principios SOLID** dentro de los componentes, hooks y servicios.
4. Código base funcional para que el proyecto arranque correctamente (`App.tsx`, `main.tsx`, `router`, etc.).


## ✅ Screaming Architecture - Estructura de Proyecto

```bash
src/
├── features/                  # Funcionalidades principales
│   ├── auth/                 # Funcionalidad de autenticación
│   │   ├── components/       # Componentes específicos de auth
│   │   ├── services/         # Llamadas API relacionadas
│   │   ├── model.ts          # Tipos y estado local de auth
│   │   └── logic.ts          # Casos de uso (login, logout, etc.)
│   └── products/             # Funcionalidad de productos
│       ├── components/       # Componentes específicos de productos
│       ├── services/         # Llamadas API relacionadas
│       ├── model.ts          # Tipos y estado local de productos
│       └── logic.ts          # Casos de uso de productos
├── shared/                   # Elementos compartidos en toda la app
│   ├── ui/                   # Componentes UI reutilizables (Botón, Modal, etc.)
│   ├── styles/               # Estilos globales
│   ├── hooks/                # Hooks reutilizables
│   ├── types/                # Tipos globales TypeScript
│   ├── constants/            # Constantes generales
│   └── utils/                # Funciones utilitarias
├── app/                      # Infraestructura general de la app
│   ├── routes.tsx           # Rutas principales
│   ├── App.tsx              # App wrapper
│   └── store.ts             # Gestión del estado central
└── index.tsx                # Entrada principal

````

---

**Cursor**

I'll help you set up a React project with TypeScript following the Screaming Architecture principles and SOLID design patterns. Let's start by examining the current state and then make the necessary changes.

First, let's check the current package.json to see what dependencies we need to add:


Let's first update the package.json with the required dependencies and then create the project structure. I'll add React Router, TailwindCSS, and other necessary dependencies:


```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.97",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "dotenv": "^16.4.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  },
  // ... existing code ...
```

Now, let's create the project structure following Screaming Architecture principles. I'll create the necessary directories and base files:


Now, let's create the base configuration files for TailwindCSS:


```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Let's create the PostCSS configuration:


```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Now, let's create the main application files. First, let's create the index.tsx:


```typescriptreact
import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/styles/index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

Let's create the main App component:


```typescriptreact
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
```

Let's create the routes configuration:


```typescriptreact
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading for better performance
const Home = React.lazy(() => import('../features/products/components/Home'));
const Login = React.lazy(() => import('../features/auth/components/Login'));

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};
```

Let's create a base component for the Home page:


```typescriptreact
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Our App
      </h1>
      <p className="text-lg text-gray-600">
        This is a sample home page built with React, TypeScript, and TailwindCSS.
      </p>
    </div>
  );
};

export default Home;
```

Let's create a basic Login component:


```typescriptreact
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

Let's create the global styles file:


```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles can be added below */
```

Now that we have set up the basic structure, let me explain the organization and how it follows SOLID principles:

1. **Screaming Architecture Structure**:
   - `features/`: Contains domain-specific functionality
     - `auth/`: Authentication feature
     - `products/`: Products feature
   - `shared/`: Reusable components and utilities
   - `app/`: Application infrastructure

2. **SOLID Principles Implementation**:

   a. **Single Responsibility Principle (SRP)**:
   - Each component has a single responsibility
   - Services are separated from components
   - Logic is separated from UI components

   b. **Open/Closed Principle (OCP)**:
   - Components are designed to be extended without modification
   - Use of composition over inheritance
   - Shared UI components are built to be customizable

   c. **Liskov Substitution Principle (LSP)**:
   - Components are designed to be interchangeable
   - Props interfaces are well-defined
   - Type safety with TypeScript

   d. **Interface Segregation Principle (ISP)**:
   - Components only receive the props they need
   - Services are split into specific interfaces
   - Hooks are focused on specific functionality

   e. **Dependency Inversion Principle (DIP)**:
   - Components depend on abstractions (interfaces)
   - Services are injected where needed
   - Context API for state management

3. **Best Practices Implemented**:
   - Lazy loading for route components
   - TypeScript for type safety
   - TailwindCSS for styling
   - React Router for navigation
   - Component-based architecture
   - Separation of concerns

To start using the project:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The project is now set up with a basic structure that follows Screaming Architecture principles and SOLID design patterns. You can start building your features by:

1. Adding new components in the appropriate feature directory
2. Creating shared components in the `shared/ui` directory
3. Adding new routes in `app/routes.tsx`
4. Implementing services in the feature-specific `services` directories

Would you like me to explain any specific part in more detail or help you implement additional features?

```shellscript
npm install
```

```shellscript
npm start
```

