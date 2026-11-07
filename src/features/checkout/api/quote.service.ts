import type {
  QuoteRequest,
  QuoteResponse,
} from '@/features/checkout/types/quote.types'
import { apiClient } from '@/services/api/api-client'

export async function getQuote(
  request: QuoteRequest = {},
): Promise<QuoteResponse> {
  const response = await apiClient.post<QuoteResponse>(
    '/quote',
    request,
  )

  return response.data
}