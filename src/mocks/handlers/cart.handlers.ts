import { http, HttpResponse } from 'msw/http'

import type {
  AddCartItemRequest,
  CartResponse,
} from '@/features/cart/types/cart.types'
import { nftFixtures } from '@/mocks/fixtures/nfts'
import {
  addCartStateItem,
  getCartState,
  removeCartStateItem,
  updateCartStateItem,
} from '@/mocks/state/cart'

function createCartResponse(): CartResponse {
  const items = getCartState()
    .map(({ nftId, quantity }) => {
      const nft = nftFixtures.find(
        (item) => item.id === nftId,
      )

      if (!nft) {
        return null
      }

      return {
        nft,
        quantity,
      }
    })
    .filter((item): item is CartResponse['items'][number] =>
      item !== null
    )

  return {
    items,
    totalItems: items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  }
}

export const cartHandlers = [
  http.get('/api/cart', () => {
    return HttpResponse.json(createCartResponse())
  }),

  http.post('/api/cart/items', async ({ request }) => {
    const body =
      (await request.json()) as AddCartItemRequest

    const nft = nftFixtures.find(
      (item) => item.id === body.nftId,
    )

    if (!nft) {
      return HttpResponse.json(
        {
          message: 'NFT não encontrado.',
        },
        {
          status: 404,
        },
      )
    }

    const currentItem = getCartState().find(
      (item) => item.nftId === body.nftId,
    )

    const currentQuantity = currentItem?.quantity ?? 0

    if (currentQuantity >= nft.availableEditions) {
      return HttpResponse.json(
        {
          message: 'Quantidade indisponível.',
        },
        {
          status: 409,
        },
      )
    }

    addCartStateItem(body.nftId)

    return HttpResponse.json(
      createCartResponse(),
      {
        status: 201,
      },
    )
  }),

  http.patch(
    '/api/cart/items/:nftId',
    async ({ params, request }) => {
      const nftId = String(params.nftId)

      const body = (await request.json()) as {
        quantity: number
      }

      const nft = nftFixtures.find(
        (item) => item.id === nftId,
      )

      if (!nft) {
        return HttpResponse.json(
          {
            message: 'NFT não encontrado.',
          },
          {
            status: 404,
          },
        )
      }

      if (
        !Number.isInteger(body.quantity) ||
        body.quantity < 0 ||
        body.quantity > nft.availableEditions
      ) {
        return HttpResponse.json(
          {
            message: 'Quantidade inválida.',
          },
          {
            status: 400,
          },
        )
      }

      updateCartStateItem(
        nftId,
        body.quantity,
      )

      return HttpResponse.json(
        createCartResponse(),
      )
    },
  ),

  http.delete('/api/cart/items/:nftId', ({ params }) => {
    const nftId = String(params.nftId)

    removeCartStateItem(nftId)

    return HttpResponse.json(
      createCartResponse(),
    )
  }),
]