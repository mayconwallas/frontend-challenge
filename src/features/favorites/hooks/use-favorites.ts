import { useQuery } from '@tanstack/react-query'

import { getFavorites } from '@/features/favorites/api/favorites.service'
import { favoriteKeys } from '@/features/favorites/queries/favorite-keys'

export function useFavorites() {
  return useQuery({
    queryKey: favoriteKeys.list(),
    queryFn: getFavorites,
    staleTime: 30_000,
  })
}