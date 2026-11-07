export interface FavoritesResponse {
  nftIds: string[]
}

export interface ToggleFavoriteRequest {
  nftId: string
}

export interface ToggleFavoriteResponse {
  nftId: string
  isFavorite: boolean
}