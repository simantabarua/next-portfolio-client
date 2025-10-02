
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";
export const API_PREFIX = "/api/v1";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_PREFIX}/auth/login`,
    REGISTER: `${API_PREFIX}/auth/register`,
  },
  USER: `${API_PREFIX}/user`,
  BLOG: `${API_PREFIX}/blog`,
  CATEGORY: `${API_PREFIX}/category`,
  PROJECT: `${API_PREFIX}/project`,
  PROJECT_CATEGORY: `${API_PREFIX}/projectCategory`,
};
