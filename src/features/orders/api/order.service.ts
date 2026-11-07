import type {
  CreateOrderRequest,
  OrderResponse,
} from '@/features/orders/types/order.types'
import { apiClient } from '@/services/api/api-client'

export async function createOrder(
  request: CreateOrderRequest,
): Promise<OrderResponse> {
  const response = await apiClient.post<OrderResponse>(
    '/orders',
    request,
  )

  return response.data
}

export async function getOrder(
  orderId: string,
): Promise<OrderResponse> {
  const response = await apiClient.get<OrderResponse>(
    `/orders/${orderId}`,
  )

  return response.data
}

export async function confirmOrder(
  orderId: string,
): Promise<OrderResponse> {
  const response = await apiClient.post<OrderResponse>(
    `/orders/${orderId}/confirm`,
  )

  return response.data
}

export async function rejectOrder(
  orderId: string,
): Promise<OrderResponse> {
  const response = await apiClient.post<OrderResponse>(
    `/orders/${orderId}/reject`,
  )

  return response.data
}