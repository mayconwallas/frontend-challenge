import type {
  ChangePasswordRequest,
  ProfileResponse,
  UpdateProfileRequest,
} from '@/features/profile/types/profile.types'
import { apiClient } from '@/services/api/api-client'

export async function getProfile(): Promise<ProfileResponse> {
  const response =
    await apiClient.get<ProfileResponse>('/profile')

  return response.data
}

export async function updateProfile(
  request: UpdateProfileRequest,
): Promise<ProfileResponse> {
  const response =
    await apiClient.patch<ProfileResponse>(
      '/profile',
      request,
    )

  return response.data
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<void> {
  await apiClient.post(
    '/profile/change-password',
    request,
  )
}