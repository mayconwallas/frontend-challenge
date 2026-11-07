import { http, HttpResponse } from 'msw'

import type {
  CreateOrderRequest,
  Order,
  OrderResponse,
} from '@/features/orders'
import { nftFixtures } from '@/mocks/fixtures/nfts'
import {
  clearCartState,
  getCartState,
} from '@/mocks/state/cart'
import {
  findOrderById,
  findOrderByIdempotencyKey,
  saveOrder,
  updateOrderStatus,
} from '@/mocks/state/orders'

function calculateTotals(
  subtotal: number,
  coupon?: string,
) {
  const normalizedCoupon =
    coupon?.trim().toUpperCase()

  const discount =
    normalizedCoupon === 'KURIO10'
      ? subtotal * 0.1
      : 0

  const networkFee =
    subtotal > 0
      ? 0.0025
      : 0

  const total =
    subtotal - discount + networkFee

  return {
    subtotalEth: subtotal.toFixed(4),
    discountEth: discount.toFixed(4),
    networkFeeEth: networkFee.toFixed(4),
    totalEth: total.toFixed(4),
  }
}

export const orderHandlers = [
  http.post('/api/orders', async ({ request }) => {
    const body =
      (await request.json()) as CreateOrderRequest

    const existingOrder =
      findOrderByIdempotencyKey(
        body.idempotencyKey,
      )

    if (existingOrder) {
      const response: OrderResponse = {
        order: existingOrder,
      }

      return HttpResponse.json(response)
    }

    const cartItems = getCartState()

    if (cartItems.length === 0) {
      return HttpResponse.json(
        {
          message: 'O carrinho está vazio.',
        },
        {
          status: 400,
        },
      )
    }

    const items = cartItems.flatMap(
      ({ nftId, quantity }) => {
        const nft = nftFixtures.find(
          (item) => item.id === nftId,
        )

        if (!nft) {
          return []
        }

        return [
          {
            nftId: nft.id,
            name: nft.name,
            imageUrl: nft.imageUrl,
            priceEth: nft.priceEth,
            quantity,
          },
        ]
      },
    )

    if (items.length === 0) {
      return HttpResponse.json(
        {
          message:
            'Não foi possível criar o pedido.',
        },
        {
          status: 400,
        },
      )
    }

    const subtotal = items.reduce(
      (total, item) =>
        total +
        Number(item.priceEth) * item.quantity,
      0,
    )

    const order: Order = {
      id: crypto.randomUUID(),
      status: 'pending',
      customer: body.customer,
      wallet: body.wallet,
      items,
      totals: calculateTotals(
        subtotal,
        body.coupon,
      ),
      coupon: body.coupon
        ?.trim()
        .toUpperCase(),
      createdAt: new Date().toISOString(),
      version: 1,
    }

    saveOrder(
      order,
      body.idempotencyKey,
    )

    const response: OrderResponse = {
      order,
    }

    return HttpResponse.json(
      response,
      {
        status: 201,
      },
    )
  }),

  http.get('/api/orders/:orderId', ({ params }) => {
    const orderId = String(params.orderId)

    const order = findOrderById(orderId)

    if (!order) {
      return HttpResponse.json(
        {
          message: 'Pedido não encontrado.',
        },
        {
          status: 404,
        },
      )
    }

    const response: OrderResponse = {
      order,
    }

    return HttpResponse.json(response)
  }),

  http.post(
    '/api/orders/:orderId/confirm',
    ({ params }) => {
      const orderId = String(params.orderId)

      const order = updateOrderStatus(
        orderId,
        'confirmed',
      )

      if (!order) {
        return HttpResponse.json(
          {
            message: 'Pedido não encontrado.',
          },
          {
            status: 404,
          },
        )
      }

      clearCartState()

      const response: OrderResponse = {
        order,
      }

      return HttpResponse.json(response)
    },
  ),

  http.post(
    '/api/orders/:orderId/reject',
    ({ params }) => {
      const orderId = String(params.orderId)

      const order = updateOrderStatus(
        orderId,
        'rejected',
      )

      if (!order) {
        return HttpResponse.json(
          {
            message: 'Pedido não encontrado.',
          },
          {
            status: 404,
          },
        )
      }

      const response: OrderResponse = {
        order,
      }

      return HttpResponse.json(response)
    },
  ),
]