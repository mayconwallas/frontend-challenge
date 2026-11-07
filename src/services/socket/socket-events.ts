import type { Nft } from '@/features/catalog'
import type { Order } from '@/features/orders'

export interface NftUpdatedEvent {
  nft: Nft
}

export interface OrderUpdatedEvent {
  order: Order
}

export interface ServerToClientEvents {
  'nft.updated': (event: NftUpdatedEvent) => void
  'order.updated': (event: OrderUpdatedEvent) => void
}