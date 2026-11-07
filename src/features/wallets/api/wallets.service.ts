import type {
  CreateWalletRequest,
  UpdateWalletRequest,
  Wallet,
  WalletsResponse,
} from '@/features/wallets/types/wallet.types'
import { apiClient } from '@/services/api/api-client'

export async function getWallets(): Promise<WalletsResponse> {
  const response =
    await apiClient.get<WalletsResponse>('/wallets')

  return response.data
}

export async function createWallet(
  request: CreateWalletRequest,
): Promise<WalletsResponse> {
  const response =
    await apiClient.post<WalletsResponse>(
      '/wallets',
      request,
    )

  return response.data
}

export async function updateWallet(
  request: UpdateWalletRequest,
): Promise<WalletsResponse> {
  const response =
    await apiClient.patch<WalletsResponse>(
      `/wallets/${request.id}`,
      request,
    )

  return response.data
}

export async function deleteWallet(
  walletId: string,
): Promise<WalletsResponse> {
  const response =
    await apiClient.delete<WalletsResponse>(
      `/wallets/${walletId}`,
    )

  return response.data
}

export async function setPrimaryWallet(
  walletId: string,
): Promise<WalletsResponse> {
  const response =
    await apiClient.post<WalletsResponse>(
      `/wallets/${walletId}/primary`,
    )

  return response.data
}

export type {
  Wallet,
}