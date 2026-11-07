import type {
  FavoritesResponse,
  ToggleFavoriteRequest,
  ToggleFavoriteResponse,
} from '@/features/favorites/types/favorite.types'
import { apiClient } from '@/services/api/api-client'

export async function getFavorites(): Promise<FavoritesResponse> {
  const response =
    await apiClient.get<FavoritesResponse>('/favorites')

  return response.data
}

export async function toggleFavorite(
  request: ToggleFavoriteRequest,
): Promise<ToggleFavoriteResponse> {
  const response =
    await apiClient.post<ToggleFavoriteResponse>(
      '/favorites/toggle',
      request,
    )

  return response.data
}