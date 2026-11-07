interface MockUser {
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

export function createUser(user: MockUser) {
  const users = loadUsers()

  users.push(user)

  persistUsers(users)
}

export function findUserByCredentials(
  email: string,
  password: string,
) {
  return loadUsers().find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  )
}

export function findUserByEmail(email: string) {
  return loadUsers().find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase(),
  )
}