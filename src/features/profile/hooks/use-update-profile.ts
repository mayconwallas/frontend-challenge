import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import type { Session } from '@/features/auth'
import { authKeys } from '@/features/auth/queries/auth-keys'
import { updateProfile } from '@/features/profile/api/profile.service'
import { profileKeys } from '@/features/profile/queries/profile-keys'

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (response) => {
      queryClient.setQueryData(
        profileKeys.detail(),
        response,
      )

      queryClient.setQueryData<Session | null>(
        authKeys.session(),
        (session) => {
          if (!session) {
            return session
          }

          return {
            ...session,
            user: {
              ...session.user,
              name: response.profile.displayName,
              email: response.profile.email,
            },
          }
        },
      )
    },
  })
}