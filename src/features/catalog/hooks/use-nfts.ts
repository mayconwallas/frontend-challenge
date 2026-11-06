import { useQuery } from '@tanstack/react-query'

import { getNfts } from '@/features/catalog/api/catalog.service'
import { nftKeys } from '@/features/catalog/queries/nft-keys'

export function useNfts() {
  return useQuery({
    queryKey: nftKeys.list(),
    queryFn: getNfts,
    staleTime: 30_000,
  })
}