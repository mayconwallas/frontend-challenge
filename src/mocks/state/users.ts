interface MockUser {
  id: string
  name: string
  email: string
  passwordHash: string
}

interface CreateUserInput {
  id: string
  name: string
  email: string
  password: string
}

const USERS_STORAGE_KEY = 'kurio-users'

function loadUsers(): MockUser[] {
  try {
    const storedUsers = localStorage.getItem(
      USERS_STORAGE_KEY,
    )

    if (!storedUsers) {
      return []
    }

    return JSON.parse(storedUsers) as MockUser[]
  } catch {
    return []
  }
}

function persistUsers(users: MockUser[]) {
  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(users),
  )
}

async function hashPassword(
  password: string,
) {
  const encodedPassword =
    new TextEncoder().encode(password)

  const hashBuffer =
    await crypto.subtle.digest(
      'SHA-256',
      encodedPassword,
    )

  return Array.from(
    new Uint8Array(hashBuffer),
  )
    .map((byte) =>
      byte.toString(16).padStart(2, '0'),
    )
    .join('')
}

export async function createUser(
  user: CreateUserInput,
) {
  const users = loadUsers()

  const passwordHash =
    await hashPassword(user.password)

  const storedUser: MockUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash,
  }

  users.push(storedUser)

  persistUsers(users)
}

export async function findUserByCredentials(
  email: string,
  password: string,
) {
  const passwordHash =
    await hashPassword(password)

  return loadUsers().find(
    (user) =>
      user.email.toLowerCase() ===
        email.toLowerCase() &&
      user.passwordHash === passwordHash,
  )
}

export function findUserByEmail(
  email: string,
) {
  return loadUsers().find(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase(),
  )
}