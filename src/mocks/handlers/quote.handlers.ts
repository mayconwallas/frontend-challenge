import { http, HttpResponse } from 'msw'

import type {
  QuoteRequest,
  QuoteResponse,
} from '@/features/checkout'
import { nftFixtures } from '@/mocks/fixtures/nfts'
import { getCartState } from '@/mocks/state/cart'

const VALID_COUPON = 'KURIO10'
const EXPIRED_COUPON = 'KURIOEXPIRED'

function calculateSubtotal() {
  return getCartState().reduce((total, cartItem) => {
    const nft = nftFixtures.find(
      (item) => item.id === cartItem.nftId,
    )

    if (!nft) {
      return total
    }

    return total + Number(nft.priceEth) * cartItem.quantity
  }, 0)
}

export const quoteHandlers = [
  http.post('/api/quote', async ({ request }) => {
    const body = (await request.json()) as QuoteRequest

    const coupon = body.coupon?.trim().toUpperCase()

    if (coupon === EXPIRED_COUPON) {
      return HttpResponse.json(
        {
          message: 'Cupom expirado.',
        },
        {
          status: 422,
        },
      )
    }

    if (coupon && coupon !== VALID_COUPON) {
      return HttpResponse.json(
        {
          message: 'Cupom inválido.',
        },
        {
          status: 422,
        },
      )
    }

    const subtotal = calculateSubtotal()

    const discount =
      coupon === VALID_COUPON
        ? subtotal * 0.1
        : 0

    const networkFee =
      subtotal > 0
        ? 0.0025
        : 0

    const total =
      subtotal - discount + networkFee

    const response: QuoteResponse = {
      subtotalEth: subtotal.toFixed(4),
      discountEth: discount.toFixed(4),
      networkFeeEth: networkFee.toFixed(4),
      totalEth: total.toFixed(4),
      coupon,
    }

    return HttpResponse.json(response)
  }),
]