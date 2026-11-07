import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { login } from '@/features/auth/api/auth.service'
import { authKeys } from '@/features/auth/queries/auth-keys'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,

    onSuccess: (session) => {
      queryClient.setQueryData(
        authKeys.session(),
        session,
      )
    },
  })
}
