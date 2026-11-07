import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { toggleFavorite } from '@/features/favorites/api/favorites.service'
import { favoriteKeys } from '@/features/favorites/queries/favorite-keys'
import type { FavoritesResponse } from '@/features/favorites/types/favorite.types'

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavorite,

    onMutate: async ({ nftId }) => {
      await queryClient.cancelQueries({
        queryKey: favoriteKeys.list(),
      })

      const previousFavorites =
        queryClient.getQueryData<FavoritesResponse>(
          favoriteKeys.list(),
        )

      queryClient.setQueryData<FavoritesResponse>(
        favoriteKeys.list(),
        (current) => {
          const nftIds = current?.nftIds ?? []
          const isFavorite = nftIds.includes(nftId)

          return {
            nftIds: isFavorite
              ? nftIds.filter((id) => id !== nftId)
              : [...nftIds, nftId],
          }
        },
      )

      return {
        previousFavorites,
      }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          favoriteKeys.list(),
          context.previousFavorites,
        )
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: favoriteKeys.list(),
      })
    },
  })
}