const DEFAULT_API_URL = '/api'

export const apiConfig = {
  baseURL: import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
  timeout: 10_000,
} as const