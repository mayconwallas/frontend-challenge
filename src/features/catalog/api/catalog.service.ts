import type {
  NftDetailResponse,
  NftFilters,
  NftListResponse,
} from '@/features/catalog/types/nft.types'
import { apiClient } from '@/services/api/api-client'

export async function getNfts(
  filters: NftFilters,
): Promise<NftListResponse> {
  const response = await apiClient.get<NftListResponse>('/nfts', {
    params: {
      tab: filters.tab,
      sort: filters.sort,
      page: filters.page,
      ...(filters.collection && {
        collection: filters.collection,
      }),
      ...(filters.network && {
        network: filters.network,
      }),
    },
  })

  return response.data
}

export async function getNft(
  nftId: string,
): Promise<NftDetailResponse> {
  const response = await apiClient.get<NftDetailResponse>(
    `/nfts/${nftId}`,
  )

  return response.data
}