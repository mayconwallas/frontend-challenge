import { useQuery } from '@tanstack/react-query'

import { getCart } from '@/features/cart/api/cart.service'
import { cartKeys } from '@/features/cart/queries/cart-keys'

export function useCart() {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: getCart,
    staleTime: 30_000,
  })
}