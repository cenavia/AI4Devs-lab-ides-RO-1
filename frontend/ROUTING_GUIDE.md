# Guía de Rutas del Sistema LTI (Talent Tracking)

## Resumen del Sistema de Navegación

El sistema LTI utiliza **React Router DOM v6** con una arquitectura de rutas jerárquicas y protegidas. Todas las rutas principales están protegidas por autenticación y utilizan un layout común con navegación lateral.

## Estructura de Rutas

### 🔓 Rutas Públicas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/login` | `Login` | Página de inicio de sesión |

### 🔒 Rutas Protegidas (con Layout)

Todas las rutas protegidas están envueltas en:
- `ProtectedRoute` - Verificación de autenticación
- `Layout` - Navegación lateral y header común

#### 📊 Dashboard Principal

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Navigate → /dashboard` | Redirige al dashboard |
| `/dashboard` | `Dashboard` | Panel principal con estadísticas y lista de candidatos |

#### 👥 Gestión de Candidatos

| Ruta | Componente | Descripción | Estado |
|------|------------|-------------|--------|
| `/candidates` | `Navigate → /dashboard` | Redirige al dashboard | ✅ |
| `/candidates/new` | `CandidateForm` | Formulario para nuevo candidato | ✅ |
| `/candidates/edit/:id` | `CandidateForm` | Editar candidato existente | ✅ |
| `/candidates/view/:id` | `Placeholder` | Detalles del candidato | 🚧 TODO |

#### 💼 Gestión de Posiciones

| Ruta | Componente | Descripción | Estado |
|------|------------|-------------|--------|
| `/positions` | `Home` | Lista de posiciones | ✅ |
| `/positions/new` | `Placeholder` | Crear nueva posición | 🚧 TODO |
| `/positions/edit/:id` | `Placeholder` | Editar posición | 🚧 TODO |
| `/positions/view/:id` | `Placeholder` | Detalles de posición | 🚧 TODO |

#### 📈 Reportes y Analytics

| Ruta | Componente | Descripción | Estado |
|------|------------|-------------|--------|
| `/reports` | `Placeholder` | Dashboard de reportes | 🚧 TODO |
| `/reports/candidates` | `Placeholder` | Reportes de candidatos | 🚧 TODO |
| `/reports/positions` | `Placeholder` | Reportes de posiciones | 🚧 TODO |
| `/reports/pipeline` | `Placeholder` | Analytics del pipeline | 🚧 TODO |

#### ⚙️ Configuración

| Ruta | Componente | Descripción | Estado |
|------|------------|-------------|--------|
| `/settings` | `Placeholder` | Configuración general | 🚧 TODO |
| `/settings/profile` | `Placeholder` | Perfil de usuario | 🚧 TODO |
| `/settings/team` | `Placeholder` | Gestión de equipo | 🚧 TODO |
| `/settings/integrations` | `Placeholder` | Integraciones | 🚧 TODO |

#### 🔄 Rutas de Fallback

| Ruta | Comportamiento |
|------|----------------|
| `*` | Redirige a `/dashboard` |

## Componentes de Navegación

### Layout Component

El componente `Layout` proporciona:

- **Sidebar Navigation**: Navegación lateral con iconos y submenús
- **Header**: Título dinámico, fecha actual, búsqueda y notificaciones  
- **User Section**: Avatar del usuario y opción de logout
- **Responsive Design**: Diseño adaptable para diferentes tamaños de pantalla

#### Navegación Lateral

```typescript
const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Candidates", 
    href: "/candidates",
    icon: <UsersIcon />,
    submenu: [
      { name: "All Candidates", href: "/dashboard" },
      { name: "Add New", href: "/candidates/new" },
    ],
  },
  {
    name: "Positions",
    href: "/positions", 
    icon: <BriefcaseIcon />,
    submenu: [
      { name: "All Positions", href: "/positions" },
      { name: "Add New", href: "/positions/new" },
    ],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <ChartIcon />,
    submenu: [
      { name: "Overview", href: "/reports" },
      { name: "Candidates", href: "/reports/candidates" },
      { name: "Positions", href: "/reports/positions" },
      { name: "Pipeline", href: "/reports/pipeline" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
    submenu: [
      { name: "General", href: "/settings" },
      { name: "Profile", href: "/settings/profile" },
      { name: "Team", href: "/settings/team" },
      { name: "Integrations", href: "/settings/integrations" },
    ],
  },
];
```

### ProtectedRoute Component

- Verifica la autenticación del usuario
- Redirige a `/login` si no está autenticado
- Preserva la ruta original para redirección post-login

## Patrones de Navegación

### 1. Navegación Programática

```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navegar a nueva ruta
navigate("/candidates/new");

// Navegar con reemplazo (no agrega al historial)
navigate("/dashboard", { replace: true });

// Navegar con estado
navigate("/candidates/edit/123", { 
  state: { candidateData } 
});
```

### 2. Parámetros de Ruta

```typescript
import { useParams } from "react-router-dom";

const { id } = useParams<{ id: string }>();
```

### 3. Estado de Navegación

```typescript
import { useLocation } from "react-router-dom";

const location = useLocation();
const candidateData = location.state?.candidateData;
```

## Funcionalidades Implementadas

### ✅ Completadas

1. **Estructura de rutas jerárquicas** con React Router v6
2. **Layout responsivo** con navegación lateral
3. **Protección de rutas** con autenticación
4. **Dashboard principal** con estadísticas
5. **Formulario de candidatos** (nuevo/edición)
6. **Navegación activa** con indicadores visuales
7. **Submenús expandibles** en la navegación lateral

### 🚧 Pendientes por Implementar

1. **Autenticación real** (actualmente simulada)
2. **Componentes de posiciones** (crear, editar, ver)
3. **Sistema de reportes** y analytics
4. **Páginas de configuración**
5. **Detalles de candidatos** (vista de solo lectura)
6. **Sistema de notificaciones**
7. **Búsqueda global**

## Consideraciones Técnicas

### Rendimiento

- **Code Splitting**: Considerar lazy loading para rutas futuras
- **Memoización**: Componentes de navegación optimizados
- **Estado compartido**: Context API para datos globales

### UX/UI

- **Breadcrumbs**: Agregar para navegación profunda
- **Loading States**: Indicadores de carga entre rutas
- **Error Boundaries**: Manejo de errores de navegación
- **Responsive**: Menú hamburguesa para móviles

### Seguridad

- **Route Guards**: Verificación de permisos por rol
- **Token Refresh**: Manejo automático de tokens
- **Logout Automático**: Por inactividad o token expirado

## Próximos Pasos

1. **Implementar autenticación real** con JWT/OAuth
2. **Desarrollar componentes faltantes** para posiciones y reportes
3. **Agregar sistema de permisos** basado en roles
4. **Implementar búsqueda global** y filtros
5. **Añadir breadcrumbs** y mejoras de UX
6. **Optimizar rendimiento** con lazy loading
7. **Tests unitarios** para componentes de navegación 