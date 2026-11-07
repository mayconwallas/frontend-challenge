import { useMutation } from '@tanstack/react-query'

import { changePassword } from '@/features/profile/api/profile.service'

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    retry: false,
  })
}
