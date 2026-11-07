import { useQuery } from '@tanstack/react-query'

import { getOrder } from '@/features/orders/api/order.service'
import { orderKeys } from '@/features/orders/queries/order-keys'

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrder(orderId),
    enabled: Boolean(orderId),
    retry: false,
  })
}
