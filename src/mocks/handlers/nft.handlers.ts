import { http, HttpResponse } from 'msw/http'

import { nftFixtures } from '@/mocks/fixtures/nfts'

export const nftHandlers = [
  http.get('/api/nfts', () => {
    return HttpResponse.json({
      items: nftFixtures,
      total: nftFixtures.length,
    })
  }),
]