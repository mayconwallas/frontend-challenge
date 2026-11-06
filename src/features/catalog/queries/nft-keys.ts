import type { NftFilters } from '@/features/catalog/types/nft.types'

export const nftKeys = {
  all: ['nfts'] as const,

  lists: () => [...nftKeys.all, 'list'] as const,

  list: (filters: NftFilters) =>
    [...nftKeys.lists(), filters] as const,

  details: () => [...nftKeys.all, 'detail'] as const,

  detail: (id: string) =>
    [...nftKeys.details(), id] as const,
}