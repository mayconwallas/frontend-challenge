import { http, HttpResponse } from 'msw'

import type {
  ChangePasswordRequest,
  ProfileResponse,
  UpdateProfileRequest,
} from '@/features/profile'
import {
  getProfile,
  updateProfile,
} from '@/mocks/state/profile'

export const profileHandlers = [
  http.get('/api/profile', () => {
    const profile = getProfile()

    if (!profile) {
      return HttpResponse.json(
        {
          message: 'Sessão não encontrada.',
        },
        {
          status: 401,
        },
      )
    }

    const response: ProfileResponse = {
      profile,
    }

    return HttpResponse.json(response)
  }),

  http.patch('/api/profile', async ({ request }) => {
    const body =
      (await request.json()) as UpdateProfileRequest

    const profile = updateProfile(body)

    const response: ProfileResponse = {
      profile,
    }

    return HttpResponse.json(response)
  }),

  http.post(
    '/api/profile/change-password',
    async ({ request }) => {
      const body =
        (await request.json()) as ChangePasswordRequest

      if (
        body.newPassword !==
        body.confirmPassword
      ) {
        return HttpResponse.json(
          {
            message:
              'A confirmação da nova senha não corresponde.',
          },
          {
            status: 400,
          },
        )
      }

      if (body.newPassword.length < 8) {
        return HttpResponse.json(
          {
            message:
              'A nova senha deve ter pelo menos 8 caracteres.',
          },
          {
            status: 400,
          },
        )
      }

      if (!body.currentPassword) {
        return HttpResponse.json(
          {
            message: 'Informe a senha atual.',
          },
          {
            status: 400,
          },
        )
      }

      return new HttpResponse(null, {
        status: 204,
      })
    },
  ),
]