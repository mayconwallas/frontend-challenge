import { http, HttpResponse } from 'msw/http'

import type { ToggleFavoriteRequest } from '@/features/favorites/types/favorite.types'
import { nftFixtures } from '@/mocks/fixtures/nfts'
import {
  getFavoriteNftIds,
  toggleFavoriteNft,
} from '@/mocks/state/favorites'

export const favoriteHandlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json({
      nftIds: getFavoriteNftIds(),
    })
  }),

  http.post(
    '/api/favorites/toggle',
    async ({ request }) => {
      const body =
        (await request.json()) as ToggleFavoriteRequest

      const nftExists = nftFixtures.some(
        (nft) => nft.id === body.nftId,
      )

      if (!nftExists) {
        return HttpResponse.json(
          {
            message: 'NFT não encontrado.',
          },
          {
            status: 404,
          },
        )
      }

      const isFavorite = toggleFavoriteNft(body.nftId)

      return HttpResponse.json({
        nftId: body.nftId,
        isFavorite,
      })
    },
  ),
]