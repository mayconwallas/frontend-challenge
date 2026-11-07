import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { cartKeys } from '@/features/cart/queries/cart-keys'
import { confirmOrder } from '@/features/orders/api/order.service'
import { orderKeys } from '@/features/orders/queries/order-keys'

export function useConfirmOrder(
  orderId: string,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => confirmOrder(orderId),

    onSuccess: async (response) => {
      queryClient.setQueryData(
        orderKeys.detail(orderId),
        response,
      )

      await queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      })
    },
  })
}