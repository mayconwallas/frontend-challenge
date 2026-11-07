import { Link } from '@tanstack/react-router'

import type { Nft } from '@/features/catalog/types/nft.types'

interface NftCardProps {
  nft: Nft
}

export function NftCard({ nft }: NftCardProps) {
  return (
    <article className="group min-w-0">
      <Link
        to="/nft/$nftId"
        params={{
          nftId: nft.id,
        }}
        className="block"
      >
        <div className="flex aspect-[258/300] items-center justify-center overflow-hidden bg-card px-1">
          <img
            src={nft.imageUrl}
            alt={`NFT ${nft.name}`}
            loading="lazy"
            className="aspect-square w-full rounded-[15px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <h3 className="truncate text-[16px] font-normal leading-[16px] text-foreground transition-colors group-hover:text-accent">
            {nft.name}
          </h3>

          <p className="text-[18px] font-bold leading-[16px] text-accent">
            {nft.priceEth} ETH
          </p>
        </div>
      </Link>
    </article>
  )
}