export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  CANDIDATES: "/api/candidates",
  USERS: "/api/users",
  HEALTH: "/api/health",
} as const;

export const SKILL_LEVELS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
];

export const CANDIDATE_STATUS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "HIRED", label: "Hired" },
  { value: "REJECTED", label: "Rejected" },
] as const;
