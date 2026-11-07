import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { register } from '@/features/auth/api/auth.service'
import { authKeys } from '@/features/auth/queries/auth-keys'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: register,

    onSuccess: (session) => {
      queryClient.setQueryData(
        authKeys.session(),
        session,
      )
    },
  })
}