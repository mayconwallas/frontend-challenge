const favoriteNftIds = new Set<string>()

export function getFavoriteNftIds() {
  return Array.from(favoriteNftIds)
}

export function toggleFavoriteNft(nftId: string) {
  if (favoriteNftIds.has(nftId)) {
    favoriteNftIds.delete(nftId)

    return false
  }

  favoriteNftIds.add(nftId)

  return true
}