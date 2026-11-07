import { isAxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

import { getNft } from '@/features/catalog/api/catalog.service'
import { nftKeys } from '@/features/catalog/queries/nft-keys'

export function useNft(nftId: string) {
  return useQuery({
    queryKey: nftKeys.detail(nftId),
    queryFn: () => getNft(nftId),
    staleTime: 30_000,

    retry: (failureCount, error) => {
      if (
        isAxiosError(error) &&
        error.response?.status === 404
      ) {
        return false
      }

      return failureCount < 2
    },
  })
}