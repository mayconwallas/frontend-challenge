export type NftNetwork = 'ethereum' | 'polygon' | 'solana'

export interface Nft {
  id: string
  name: string
  creator: string
  collection: string
  network: NftNetwork
  imageUrl: string
  priceEth: string
  availableEditions: number
  isNew: boolean
  isTrending: boolean
}

export interface NftListResponse {
  items: Nft[]
  total: number
}

export type NftTab = 'all' | 'new' | 'trending'

export type NftSort = 'recent' | 'price-asc' | 'price-desc'

export interface NftFilters {
  tab: NftTab
  collection?: string
  network?: string
  sort: NftSort
  page: number
}

export interface NftDetailResponse {
  item: Nft
}