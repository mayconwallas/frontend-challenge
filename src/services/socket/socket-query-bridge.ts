import { queryClient } from '@/app/config/query-client'
import type { NftDetailResponse } from '@/features/catalog/types/nft.types'
import { nftKeys } from '@/features/catalog/queries/nft-keys'
import type { OrderResponse } from '@/features/orders'
import { orderKeys } from '@/features/orders/queries/order-keys'
import { socketClient } from '@/services/socket/socket-client'
import type {
  NftUpdatedEvent,
  OrderUpdatedEvent,
} from '@/services/socket/socket-events'

function handleNftUpdated({
  nft,
}: NftUpdatedEvent) {
  queryClient.setQueryData<NftDetailResponse>(
    nftKeys.detail(nft.id),
    {
      item: nft,
    },
  )

  void queryClient.invalidateQueries({
    queryKey: nftKeys.lists(),
  })
}

function handleOrderUpdated({
  order,
}: OrderUpdatedEvent) {
  queryClient.setQueryData<OrderResponse>(
    orderKeys.detail(order.id),
    {
      order,
    },
  )
}

export function registerSocketQueryBridge() {
  socketClient.off(
    'nft.updated',
    handleNftUpdated,
  )

  socketClient.off(
    'order.updated',
    handleOrderUpdated,
  )

  socketClient.on(
    'nft.updated',
    handleNftUpdated,
  )

  socketClient.on(
    'order.updated',
    handleOrderUpdated,
  )
}

export function unregisterSocketQueryBridge() {
  socketClient.off(
    'nft.updated',
    handleNftUpdated,
  )

  socketClient.off(
    'order.updated',
    handleOrderUpdated,
  )
}