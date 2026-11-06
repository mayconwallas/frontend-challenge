import type { NftListResponse } from '@/features/catalog/types/nft.types'
import { apiClient } from '@/services/api/api-client'

export async function getNfts(): Promise<NftListResponse> {
  const response = await apiClient.get<NftListResponse>('/nfts')

  return response.data
}