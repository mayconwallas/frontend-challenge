import { createFileRoute } from '@tanstack/react-router'

import { OrderRoute } from '@/pages/order-route'

export const Route =
  createFileRoute('/order/$orderId')({
    component: OrderRoute,
  })
