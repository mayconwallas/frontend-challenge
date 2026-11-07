import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@/features/profile/api/profile.service'
import { profileKeys } from '@/features/profile/queries/profile-keys'

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getProfile,
  })
}