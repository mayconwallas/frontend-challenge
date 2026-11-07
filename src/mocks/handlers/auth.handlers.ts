import { http, HttpResponse } from 'msw'

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/features/auth/types/auth.types'
import {
  clearAuthSession,
  setAuthSession,
} from '@/mocks/state/auth'
import {
  createUser,
  findUserByCredentials,
  findUserByEmail,
} from '@/mocks/state/users'

const TEST_EMAIL = 'collector@kurio.com'
const TEST_PASSWORD = 'Kurio123!'

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest

    const isDefaultUser =
      body.email.toLowerCase() === TEST_EMAIL &&
      body.password === TEST_PASSWORD

    const registeredUser = findUserByCredentials(
      body.email,
      body.password,
    )

    if (!isDefaultUser && !registeredUser) {
      return HttpResponse.json(
        {
          message: 'E-mail ou senha inválidos.',
        },
        {
          status: 401,
        },
      )
    }

    const response: AuthResponse = registeredUser
      ? {
          user: {
            id: registeredUser.id,
            name: registeredUser.name,
            email: registeredUser.email,
          },
          token: 'mock-access-token',
        }
      : {
          user: {
            id: 'collector-001',
            name: 'Kurio Collector',
            email: TEST_EMAIL,
          },
          token: 'mock-access-token',
        }

    setAuthSession(response)

    return HttpResponse.json(response)
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as RegisterRequest

    if (findUserByEmail(body.email)) {
      return HttpResponse.json(
        {
          message: 'E-mail já cadastrado.',
        },
        {
          status: 409,
        },
      )
    }

    const user = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      password: body.password,
    }

    createUser(user)

    const response: AuthResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: 'mock-access-token',
    }

    setAuthSession(response)

    return HttpResponse.json(response, {
      status: 201,
    })
  }),

  http.post('/api/auth/logout', () => {
    clearAuthSession()

    return new HttpResponse(null, {
      status: 204,
    })
  }),
]