import { setupWorker } from 'msw/browser'
import { healthHandlers } from '@/mocks/handlers/health.handlers'
import { nftHandlers } from '@/mocks/handlers/nft.handlers'
import { favoriteHandlers } from '@/mocks/handlers/favorite.handlers'

export const worker = setupWorker(
  ...healthHandlers,
  ...nftHandlers,
  ...favoriteHandlers,
)