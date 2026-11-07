import type { Session } from '@/features/auth/types/auth.types'

const AUTH_STORAGE_KEY = 'kurio-session'

export function getAuthSession(): Session | null {
  try {
    const storedSession = localStorage.getItem(
      AUTH_STORAGE_KEY,
    )

    if (!storedSession) {
      return null
    }

    return JSON.parse(storedSession) as Session
  } catch {
    return null
  }
}

export function setAuthSession(session: Session) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session),
  )
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}