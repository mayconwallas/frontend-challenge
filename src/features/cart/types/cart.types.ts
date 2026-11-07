import type { Nft } from '@/features/catalog'

export interface CartItem {
  nft: Nft
  quantity: number
}

export interface CartResponse {
  items: CartItem[]
  totalItems: number
}

export interface AddCartItemRequest {
  nftId: string
}

export interface UpdateCartItemRequest {
  nftId: string
  quantity: number
}