import { http, HttpResponse } from 'msw'

import type {
  CreateWalletRequest,
  UpdateWalletRequest,
  WalletsResponse,
} from '@/features/wallets/types/wallet.types'
import {
  createWallet,
  getWallets,
  removeWallet,
  setPrimaryWallet,
  updateWallet,
} from '@/mocks/state/wallets'

function createResponse(): WalletsResponse {
  return {
    wallets: getWallets(),
  }
}

export const walletHandlers = [
  http.get('/api/wallets', () => {
    return HttpResponse.json(
      createResponse(),
    )
  }),

  http.post('/api/wallets', async ({ request }) => {
    const body =
      (await request.json()) as CreateWalletRequest

    createWallet(body)

    return HttpResponse.json(
      createResponse(),
      {
        status: 201,
      },
    )
  }),

  http.patch(
    '/api/wallets/:walletId',
    async ({ params, request }) => {
      const body =
        (await request.json()) as UpdateWalletRequest

      const wallet = updateWallet({
        ...body,
        id: String(params.walletId),
      })

      if (!wallet) {
        return HttpResponse.json(
          {
            message: 'Carteira não encontrada.',
          },
          {
            status: 404,
          },
        )
      }

      return HttpResponse.json(
        createResponse(),
      )
    },
  ),

  http.delete(
    '/api/wallets/:walletId',
    ({ params }) => {
      removeWallet(
        String(params.walletId),
      )

      return HttpResponse.json(
        createResponse(),
      )
    },
  ),

  http.post(
    '/api/wallets/:walletId/primary',
    ({ params }) => {
      setPrimaryWallet(
        String(params.walletId),
      )

      return HttpResponse.json(
        createResponse(),
      )
    },
  ),
]