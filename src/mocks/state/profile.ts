import type {
  CollectorProfile,
  UpdateProfileRequest,
} from '@/features/profile/types/profile.types'
import {
  getAuthSession,
  setAuthSession,
} from '@/mocks/state/auth'

const PROFILE_STORAGE_KEY = 'kurio-profile'

export function getProfile(): CollectorProfile | null {
  try {
    const storedProfile = localStorage.getItem(
      PROFILE_STORAGE_KEY,
    )

    if (storedProfile) {
      return JSON.parse(
        storedProfile,
      ) as CollectorProfile
    }

    const session = getAuthSession()

    if (!session) {
      return null
    }

    return {
      displayName: session.user.name,
      username: session.user.name
        .toLowerCase()
        .replace(/\s+/g, '.'),
      email: session.user.email,
    }
  } catch {
    return null
  }
}

export function updateProfile(
  request: UpdateProfileRequest,
) {
  const profile: CollectorProfile = {
    ...request,
  }

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(profile),
  )

  const session = getAuthSession()

  if (session) {
    setAuthSession({
      ...session,
      user: {
        ...session.user,
        name: profile.displayName,
        email: profile.email,
      },
    })
  }

  return profile
}