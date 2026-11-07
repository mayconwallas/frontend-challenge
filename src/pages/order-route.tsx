import { useParams } from '@tanstack/react-router'

import { OrderPage } from '@/pages/order-page'

export function OrderRoute() {
  const { orderId } = useParams({
    from: '/order/$orderId',
  })

  return <OrderPage orderId={orderId} />
}