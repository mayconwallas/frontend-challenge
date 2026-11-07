import { useMutation } from '@tanstack/react-query'

import { createOrder } from '@/features/orders/api/order.service'

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    retry: false,
  })
}