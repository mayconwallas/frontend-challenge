import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { addCartItem } from '@/features/cart/api/cart.service'
import { cartKeys } from '@/features/cart/queries/cart-keys'

export function useAddCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCartItem,

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      )
    },
  })
}