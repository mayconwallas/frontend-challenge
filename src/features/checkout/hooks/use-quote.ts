import { useQuery } from '@tanstack/react-query'

import { getQuote } from '@/features/checkout/api/quote.service'
import { quoteKeys } from '@/features/checkout/queries/quote-keys'

export function useQuote(coupon?: string) {
  return useQuery({
    queryKey: quoteKeys.detail(coupon),
    queryFn: () => getQuote({ coupon }),
  })
}