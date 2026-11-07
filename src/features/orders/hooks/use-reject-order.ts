import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { rejectOrder } from '@/features/orders/api/order.service'
import { orderKeys } from '@/features/orders/queries/order-keys'

export function useRejectOrder(
  orderId: string,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => rejectOrder(orderId),

    onSuccess: (response) => {
      queryClient.setQueryData(
        orderKeys.detail(orderId),
        response,
      )
    },
  })
}