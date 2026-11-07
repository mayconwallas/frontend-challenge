import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/features/auth/types/auth.types'
import { apiClient } from '@/services/api/api-client'

export async function login(
  request: LoginRequest,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    '/auth/login',
    request,
  )

  return response.data
}

export async function register(
  request: RegisterRequest,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    '/auth/register',
    request,
  )

  return response.data
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout')
}