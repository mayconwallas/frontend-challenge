import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { logout } from '@/features/auth/api/auth.service'
import { authKeys } from '@/features/auth/queries/auth-keys'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(
        authKeys.session(),
        null,
      )
    },
  })
}