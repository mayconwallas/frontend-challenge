import { useQuery } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/queries/auth-keys'
import { getAuthSession } from '@/mocks/state/auth'

export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => getAuthSession(),
    staleTime: Infinity,
  })
}