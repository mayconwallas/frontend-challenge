import { http, HttpResponse } from 'msw/http'

import { nftFixtures } from '@/mocks/fixtures/nfts'

const PAGE_SIZE = 3

export const nftHandlers = [
  http.get('/api/nfts', ({ request }) => {
    const url = new URL(request.url)

    const tab = url.searchParams.get('tab') ?? 'all'
    const collection = url.searchParams.get('collection')
    const network = url.searchParams.get('network')
    const sort = url.searchParams.get('sort') ?? 'recent'

    const page = Math.max(
      1,
      Number(url.searchParams.get('page')) || 1,
    )

    let items = [...nftFixtures]

    if (tab === 'new') {
      items = items.filter((nft) => nft.isNew)
    }

    if (tab === 'trending') {
      items = items.filter((nft) => nft.isTrending)
    }

    if (collection) {
      items = items.filter(
        (nft) => nft.collection === collection,
      )
    }

    if (network) {
      items = items.filter(
        (nft) => nft.network === network,
      )
    }

    if (sort === 'price-asc') {
      items.sort(
        (a, b) =>
          Number(a.priceEth) - Number(b.priceEth),
      )
    }

    if (sort === 'price-desc') {
      items.sort(
        (a, b) =>
          Number(b.priceEth) - Number(a.priceEth),
      )
    }

    const total = items.length
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE

    return HttpResponse.json({
      items: items.slice(start, end),
      total,
    })
  }),

  http.get('/api/nfts/:nftId', ({ params }) => {
    const nftId = String(params.nftId)

    const nft = nftFixtures.find(
      (item) => item.id === nftId,
    )

    if (!nft) {
      return HttpResponse.json(
        {
          message: 'NFT não encontrado.',
        },
        {
          status: 404,
        },
      )
    }

    return HttpResponse.json({
      item: nft,
    })
  }),
]