export interface Nft {
  id: string
  name: string
  creator: string
  collection: string
  imageUrl: string
  priceEth: string
  availableEditions: number
}

export interface NftListResponse {
  items: Nft[]
  total: number
}