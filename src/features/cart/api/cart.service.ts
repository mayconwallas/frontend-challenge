import type {
  AddCartItemRequest,
  CartResponse,
  UpdateCartItemRequest,
} from '@/features/cart/types/cart.types'
import { apiClient } from '@/services/api/api-client'

export async function getCart(): Promise<CartResponse> {
  const response =
    await apiClient.get<CartResponse>('/cart')

  return response.data
}

export async function addCartItem(
  request: AddCartItemRequest,
): Promise<CartResponse> {
  const response =
    await apiClient.post<CartResponse>(
      '/cart/items',
      request,
    )

  return response.data
}

export async function updateCartItem(
  request: UpdateCartItemRequest,
): Promise<CartResponse> {
  const response =
    await apiClient.patch<CartResponse>(
      `/cart/items/${request.nftId}`,
      {
        quantity: request.quantity,
      },
    )

  return response.data
}

export async function removeCartItem(
  nftId: string,
): Promise<CartResponse> {
  const response =
    await apiClient.delete<CartResponse>(
      `/cart/items/${nftId}`,
    )

  return response.data
}