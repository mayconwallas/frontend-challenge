import type { Nft } from '@/features/catalog/types/nft.types'

export const nftFixtures: Nft[] = [
  {
    id: 'nft-001',
    name: 'Digital Genesis',
    creator: 'Kurio Studio',
    collection: 'Genesis',
    imageUrl: '/images/nfts/digital-genesis.webp',
    priceEth: '0.45',
    availableEditions: 8,
  },
  {
    id: 'nft-002',
    name: 'Future Memory',
    creator: 'Kurio Studio',
    collection: 'Future',
    imageUrl: '/images/nfts/future-memory.webp',
    priceEth: '0.82',
    availableEditions: 4,
  },
  {
    id: 'nft-003',
    name: 'Digital Nature',
    creator: 'Kurio Studio',
    collection: 'Nature',
    imageUrl: '/images/nfts/digital-nature.webp',
    priceEth: '1.20',
    availableEditions: 2,
  },
  {
    id: 'nft-004',
    name: 'Synthetic Dreams',
    creator: 'Kurio Studio',
    collection: 'Dreams',
    imageUrl: '/images/nfts/synthetic-dreams.webp',
    priceEth: '0.64',
    availableEditions: 12,
  },
]