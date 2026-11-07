import { setupWorker } from 'msw/browser'
import { healthHandlers } from '@/mocks/handlers/health.handlers'
import { nftHandlers } from '@/mocks/handlers/nft.handlers'
import { favoriteHandlers } from '@/mocks/handlers/favorite.handlers'
import { cartHandlers } from '@/mocks/handlers/cart.handlers'
import { quoteHandlers } from '@/mocks/handlers/quote.handlers'
import { authHandlers } from '@/mocks/handlers/auth.handlers'
import { orderHandlers } from '@/mocks/handlers/order.handlers'
import { profileHandlers } from '@/mocks/handlers/profile.handlers'



export const worker = setupWorker(
  ...healthHandlers,
  ...nftHandlers,
  ...favoriteHandlers,
  ...cartHandlers,
  ...quoteHandlers,
  ...authHandlers,
  ...orderHandlers,
  ...profileHandlers,
)