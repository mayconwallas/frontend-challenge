export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'

export type OrderNetwork =
  | 'ethereum'
  | 'polygon'
  | 'solana'

export interface OrderCustomer {
  name: string
  email: string
}

export interface OrderWallet {
  id: string
  address: string
  network: OrderNetwork
}

export interface OrderItem {
  nftId: string
  name: string
  imageUrl: string
  priceEth: string
  quantity: number
}

export interface OrderTotals {
  subtotalEth: string
  discountEth: string
  networkFeeEth: string
  totalEth: string
}

export interface CreateOrderRequest {
  customer: OrderCustomer
  wallet: OrderWallet
  coupon?: string
  idempotencyKey: string
}

export interface Order {
  id: string
  status: OrderStatus
  transactionId?: string
  customer: OrderCustomer
  wallet: OrderWallet
  items: OrderItem[]
  totals: OrderTotals
  coupon?: string
  createdAt: string
  version: number
}

export interface OrderResponse {
  order: Order
}