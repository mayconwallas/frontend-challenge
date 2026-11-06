import { NftCard } from '@/features/catalog/components/nft-card'
import type { Nft } from '@/features/catalog/types/nft.types'

interface NftGridProps {
  nfts: Nft[]
}

export function NftGrid({ nfts }: NftGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-[72px]">
      {nfts.map((nft) => (
        <NftCard
          key={nft.id}
          nft={nft}
        />
      ))}
    </div>
  )
}
