import { Link } from '@tanstack/react-router'

import type { Nft } from '@/features/catalog/types/nft.types'
import { FavoriteButton } from '@/features/favorites'

interface NftCardProps {
  nft: Nft
}

export function NftCard({
  nft,
}: NftCardProps) {
  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link
          to="/nft/$nftId"
          params={{
            nftId: nft.id,
          }}
          className="block"
        >
          <div className="aspect-square overflow-hidden rounded-[10px] bg-card">
            <img
              src={nft.imageUrl}
              alt={`NFT ${nft.name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        <FavoriteButton
          nftId={nft.id}
          className="absolute right-3 top-3 z-10"
        />
      </div>

      <Link
        to="/nft/$nftId"
        params={{
          nftId: nft.id,
        }}
        className="block"
      >
        <div className="mt-3 flex flex-col gap-2">
          <h3 className="truncate text-sm font-normal leading-5 text-foreground transition-colors group-hover:text-accent sm:text-[15px]">
            {nft.name}
          </h3>

          <p className="text-base font-bold leading-5 text-accent sm:text-[17px]">
            {nft.priceEth} ETH
          </p>
        </div>
      </Link>
    </article>
  )
}