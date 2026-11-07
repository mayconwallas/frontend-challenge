const FAVORITES_STORAGE_KEY = 'kurio-favorites'

function loadFavoriteNftIds(): Set<string> {
  try {
    const storedFavorites = localStorage.getItem(
      FAVORITES_STORAGE_KEY,
    )

    if (!storedFavorites) {
      return new Set()
    }

    const favoriteIds = JSON.parse(
      storedFavorites,
    ) as string[]

    return new Set(favoriteIds)
  } catch {
    return new Set()
  }
}

const favoriteNftIds = loadFavoriteNftIds()

function persistFavoriteNftIds() {
  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(Array.from(favoriteNftIds)),
  )
}

export function getFavoriteNftIds() {
  return Array.from(favoriteNftIds)
}

export function toggleFavoriteNft(nftId: string) {
  if (favoriteNftIds.has(nftId)) {
    favoriteNftIds.delete(nftId)
    persistFavoriteNftIds()

    return false
  }

  favoriteNftIds.add(nftId)
  persistFavoriteNftIds()

  return true
}