import { createFileRoute } from '@tanstack/react-router'

import { NftDetailRoute } from '@/pages/nft-detail-route'

export const Route = createFileRoute('/nft/$nftId')({
  component: NftDetailRoute,
})