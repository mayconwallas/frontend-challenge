import { useQuery } from '@tanstack/react-query'

import { getNfts } from '@/features/catalog/api/catalog.service'
import { nftKeys } from '@/features/catalog/queries/nft-keys'
import type { NftFilters } from '@/features/catalog/types/nft.types'

export function useNfts(filters: NftFilters) {
  return useQuery({
    queryKey: nftKeys.list(filters),
    queryFn: () => getNfts(filters),
    staleTime: 30_000,
  })
}