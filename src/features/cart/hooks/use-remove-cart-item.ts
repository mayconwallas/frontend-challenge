import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { removeCartItem } from '@/features/cart/api/cart.service'
import { cartKeys } from '@/features/cart/queries/cart-keys'

export function useRemoveCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      )
    },
  })
}