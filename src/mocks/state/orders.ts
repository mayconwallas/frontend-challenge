import type {
  Order,
  OrderStatus,
} from '@/features/orders'

const ORDERS_STORAGE_KEY = 'kurio-orders'

interface StoredOrder {
  order: Order
  idempotencyKey: string
}

function loadOrders(): StoredOrder[] {
  try {
    const storedOrders = localStorage.getItem(
      ORDERS_STORAGE_KEY,
    )

    if (!storedOrders) {
      return []
    }

    return JSON.parse(storedOrders) as StoredOrder[]
  } catch {
    return []
  }
}

function persistOrders(orders: StoredOrder[]) {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders),
  )
}

export function saveOrder(
  order: Order,
  idempotencyKey: string,
) {
  const orders = loadOrders()

  orders.push({
    order,
    idempotencyKey,
  })

  persistOrders(orders)
}

export function findOrderById(orderId: string) {
  return loadOrders().find(
    ({ order }) => order.id === orderId,
  )?.order
}

export function findOrderByIdempotencyKey(
  idempotencyKey: string,
) {
  return loadOrders().find(
    (item) =>
      item.idempotencyKey === idempotencyKey,
  )?.order
}

export function updateStoredOrder(order: Order) {
  const orders = loadOrders()

  const index = orders.findIndex(
    (item) => item.order.id === order.id,
  )

  if (index === -1) {
    return
  }

  orders[index] = {
    ...orders[index],
    order,
  }

  persistOrders(orders)
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
) {
  const order = findOrderById(orderId)

  if (!order) {
    return null
  }

  const updatedOrder: Order = {
    ...order,
    status,
    transactionId:
      status === 'confirmed'
        ? crypto.randomUUID()
        : order.transactionId,
    version: order.version + 1,
  }

  updateStoredOrder(updatedOrder)

  return updatedOrder
}