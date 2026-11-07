import { NftDetailPage } from '@/pages/nft-detail-page'
import { Route } from '@/routes/nft.$nftId'

export function NftDetailRoute() {
  const { nftId } = Route.useParams()

  return <NftDetailPage nftId={nftId} />
}