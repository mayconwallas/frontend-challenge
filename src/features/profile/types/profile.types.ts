export interface CollectorProfile {
  displayName: string
  username: string
  email: string
  ensName?: string
  walletNickname?: string
  avatarUrl?: string
}

export interface UpdateProfileRequest {
  displayName: string
  username: string
  email: string
  ensName?: string
  walletNickname?: string
  avatarUrl?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProfileResponse {
  profile: CollectorProfile
}