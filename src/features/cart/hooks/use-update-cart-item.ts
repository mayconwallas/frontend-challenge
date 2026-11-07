import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { updateCartItem } from '@/features/cart/api/cart.service'
import { cartKeys } from '@/features/cart/queries/cart-keys'

export function useUpdateCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCartItem,

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      )
    },
  })
}